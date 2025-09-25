import { Category } from '../app/modules/as_category/as_category.model';
import { IAssessment } from '../app/modules/assessment/assessment.interface';
import { User } from '../app/modules/user/user.model';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { getBadgeTemplate, getCirtificateTemplate } from '../shared/templates';
import { Assessment } from '../app/modules/assessment/assessment.model';
import { ASSESSMENT_BADGE, ASSESSMENT_STATUS, USER_BADGE } from '../enums/user';
import { ObjectId } from 'mongoose';
import { fromPath } from 'pdf2pic';
import { createCanvas } from 'canvas';

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

export const generateCirtificate = async (data: IAssessment, mark?: number) => {
  try {
    const user = await User.findOne({ _id: data.user }).lean();
    const category = await Category.findOne({ _id: data.category }).lean();
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    const verificationCode = `candidate-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // Your certificate HTML
    const html = getCirtificateTemplate({
      userName: data?.personal_information?.name ?? '',
      categoryName: category?.title ?? 'gaja',
      date: data.date,
      varification_id: verificationCode!,
    });

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfUrl = `${(data as any)._id}-${verificationCode}.pdf`;
    const badgeUrl = `${(data as any)._id}-${verificationCode}-badge.png`;
    // Internal save path
    const savePath = path.join(process.cwd(), 'uploads', 'doc', pdfUrl);

    // Make sure folder exists
    fs.mkdirSync(path.dirname(savePath), { recursive: true });

    // Save PDF internally
    await page.pdf({
      path: savePath,
      printBackground: true,
      height: 575,
    });

    const result = await generateBadge((data as any)._id);

    await browser.close();
    return await Assessment.findOneAndUpdate(
      { _id: (data as any)._id },
      {
        cirtificate: `/doc/${pdfUrl}`,
        status: ASSESSMENT_STATUS.COMPLETED,
        verificationCode: verificationCode,
        badge: result,
        mark: mark,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const generateBadge = async (id: ObjectId) => {
  try {
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return;
    }

    // console.log(assessment)
    const mark = assessment?.mark || 0;
    let badge = ASSESSMENT_BADGE.BRONZE;

    if (mark >= 0 && mark <= 74) {
      badge = ASSESSMENT_BADGE.BRONZE;
    } else if (mark >= 75 && mark <= 89) {
      badge = ASSESSMENT_BADGE.SILVER;
    } else if (mark >= 90 && mark <= 100) {
      badge = ASSESSMENT_BADGE.GOLD;
    }
    if (!badge) {
      return;
    }

    const user = await User.findById(assessment.user);
    if (!user) {
      return;
    }

    const html = getBadgeTemplate({
      badge: badge as ASSESSMENT_BADGE,
      name: assessment?.personal_information?.name ?? '',
      verificationCode: `candidate-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${Math.floor(
        Math.random() * 1000
      )}`,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfUrl = `${id}-${assessment.verificationCode}.pdf`;
    // Internal save path
    const savePath = path.join(process.cwd(), 'uploads', 'doc', pdfUrl);

    // Make sure folder exists
    fs.mkdirSync(path.dirname(savePath), { recursive: true });

    // Save PDF internally
    await page.pdf({
      path: savePath,
      printBackground: true,
      height: 480,
      width: 400,
    });

    await browser.close();

    return `/doc/${pdfUrl}`;
  } catch (error) {
    console.log(error);
  }
};

export const convertPdfToImage = async (pdfPath: string): Promise<string[]> => {
  try {
    const filePath = path.join(process.cwd(), 'uploads', pdfPath);
    console.log(filePath);

    const saveDir = path.join(process.cwd(), 'uploads', 'image');

    // Make sure the folder exists
    if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;

    const imagePaths: string[] = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 0.5 }); // adjust scale for quality

      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');

      // Render PDF page onto canvas

      await page.render({ canvas: canvas as any, viewport }).promise;

      const savePath = path.join(saveDir, `page-${i}-${Date.now()}.png`);
      fs.writeFileSync(savePath, canvas.toBuffer('image/png'));

      imagePaths.push(savePath);
    }

    return imagePaths;
  } catch (error) {
    console.error('Error converting PDF to image:', error);
    return [];
  }
};
