import { ObjectId } from "mongoose";
import { ASSESSMENT_BADGE, USER_BADGE } from "../enums/user";

export const getCirtificateTemplate = (values: {
  userName: string;
  categoryName: string;
  date: Date;
  varification_id: string;
}) => {
  return `
    <html lang="en">
  <head>
    <!-- Google Fonts for cursive handwriting -->
    <link
      href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
      rel="stylesheet"
    />
  </head>
<body style="width: 1024px;height: 720px; overflow-y: hidden; margin: 0;padding: 0;">
  <div
    style="
      position: relative;
      width: 1024px;
      height: 720px;
      background-image: url('https://res.cloudinary.com/dkbcx9amc/image/upload/v1757055982/ChatGPT_Image_Sep_5_2025_11_50_51_AM_tzfntl.jpg');
      background-size: cover;
      background-position: center;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    "
  >
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 48px;
        box-sizing: border-box;
      "
    >
      <!-- Header -->
      <div style="max-width: 400px">
        <h1
          style="
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            font-weight: 600;
            color: #fbbf24;
            margin: 0 0 8px 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: 2px;
          "
        >
          CERTIFICATE
        </h1>
        <h2
          style="
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            color: #fbbf24;
            letter-spacing: 3px;
            margin: 0;
          "
        >
          OF CREDIBILITY
        </h2>
      </div>

      <!-- Main content -->
      <div
        style="display: flex; flex: 1; align-items: center; margin-top: 24px"
      >
        <div style="width: 65%; padding-right: 32px">
          <p
            style="
              color: white;
              font-size: 20px;
              margin: 0 0 16px 0;
              text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            "
          >
            This is to certify that
          </p>
          <h3
            style="
              font-family: 'Great Vibes', cursive;
              font-size: 72px;
              font-weight: 100;
              color: #fbbf24;
              margin: 0 0 24px 0;
              text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
            "
          >
            ${values.userName}
          </h3>
          <p
            style="
              color: #fbbf24;
              font-size: 18px;
              line-height: 1.8;
              max-width: 500px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
              margin: 0;
            "
          >
            This is to certify that <span style="font-size:20px; padding:0 5px;color:white" >${values.categoryName}</span> has undergone the
            unique assessment process and has demonstrated a level of
            credibility deemed satisfactory by Ready Verified and our trusted
            partners, as of ${new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 24px;
        "
      >
        <!-- Signature -->
        <div style="text-align: left">
          <div
            style="
              font-family: 'Great Vibes', cursive;
              font-size: 36px;
              color: #fbbf24;
              font-style: italic;
              margin-bottom: 8px;
            "
          >
            Dennis Willie
          </div>
          <div
            style="
              color: white;
              font-family: 'Playfair Display', serif;
              font-size: 14px;
              text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            "
          >
            Dennis Willie<br />
            Educator, Founder, Veteran
          </div>
        </div>

        <!-- Right info -->
        <div style="text-align: right">
          <div
            style="
              color: white;
              font-size: 14px;
              margin-bottom: 16px;
              text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            "
          >
            Personal Verification Number: ${values.varification_id}
          </div>

          <!-- Social icons -->
          <div style="display: flex; gap: 12px">
            <div
              style="
                width: 40px;
                height: 40px;
                background-color: #374151;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
              "
            >
              <!-- Mail Icon -->
              <svg
                style="width: 20px; height: 20px; color: white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </div>
            <div
              style="
                width: 40px;
                height: 40px;
                background-color: #3b82f6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
              "
            >
              <!-- Facebook Icon -->
              <svg
                style="width: 20px; height: 20px; color: white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              style="
                width: 40px;
                height: 40px;
                background-color: #1d4ed8;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
              "
            >
              <!-- LinkedIn Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.5h3.414v1.571h.049c.476-.9 1.635-1.852 3.366-1.852 3.594 0 4.256 2.365 4.256 5.444v6.337zm-14.693-13.176c-1.144 0-2.067-.927-2.067-2.067 0-1.141.923-2.067 2.067-2.067s2.066.926 2.066 2.067c0 1.14-.922 2.067-2.066 2.067zm1.777 13.176h-3.554v-11.5h3.554v11.5zm15.469-20.452h-20c-.828 0-1.5.671-1.5 1.5v20c0 .829.672 1.5 1.5 1.5h20c.828 0 1.5-.671 1.5-1.5v-20c0-.829-.672-1.5-1.5-1.5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</html>

    
    `;
};


export const getBadgeTemplate = (values:{badge:ASSESSMENT_BADGE,name:string,verificationCode:string}) => {
    return `
    <div style="
    background: #f0f2f5;
    padding: 40px;
    border-radius: 8px;
    text-align: center;
    width: 500px;         /* fixed width */
    height: 600px;        /* fixed height */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
">
  <div style="display: flex; flex-direction: column; justify-content: flex-end; text-align: right;">
    <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
      ${values.name}
    </p>
    <p style="font-size: 10px; color: #999; margin-bottom: 8px;">
      ${new Date().toLocaleDateString()}
    </p>
  </div>

  <div style="">
      <img src="https://res.cloudinary.com/dkbcx9amc/image/upload/v1757074657/Group_1000007672_oxlc75.png"  alt="logo" style="width: 320px; height: 200px; margin: 0 auto; flex-shrink: 0;" />
  </div>

  <p style="
      font-size: 30px;
      font-weight: bold;
      color: #333;
      margin-top:50px;
      display: block;
      position:relative;
      
  ">
      ${values.badge}
  </p>

  <div style="
      border-top: 1px solid #d9d9d9;
      padding-top: 15px;
      width: 100%;
      margin-top: auto;   /* push to bottom */
  ">
    <p style="font-size: 15px; color: #666; display: block;">
      Identification Code:
    </p>
    <p style="font-size: 12px; font-weight: bold; color: #333;">
      ${values.verificationCode}
    </p>
  </div>
</div>

    
    `
}
