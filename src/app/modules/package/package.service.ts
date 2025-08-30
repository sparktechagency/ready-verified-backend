import { StatusCodes } from 'http-status-codes';

import ApiError from '../../../errors/ApiError';
import { IPackage } from './package.interface';
import { Package } from './package.model';
import stripe from '../../../config/stripe';

const createPlanIntoDb = async (plan: IPackage) => {
    console.log(plan);
    
  const product = await stripe.products.create({
    name: plan.name,
  });
  const price = await stripe.prices.create({
    unit_amount: plan.price*100,
    currency: 'usd',
    product: product.id,
    recurring: {
      interval: plan.recurring,
    }
  });

  const payment_link = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
  });

  const createPackage = await Package.create({
    ...plan,
    price_id: price.id,
    product_id: product.id,
    payment_link: payment_link.url,
  });

  return createPackage;
};

const getAllPackageFromDb = async () => {
  const packages = await Package.find({status:{$ne: 'deleted'}}).sort({price:1}).lean();
  return packages;
};

const updatePackageFromDb = async (id: string, plan: IPackage) => {
  const isExist = await Package.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Package not found');
  }
  const product = await stripe.products.update(isExist.product_id!, {
    name: plan.name|| isExist.name,
  });
  if (plan.price && plan.price !== isExist.price) {
    const price = await stripe.prices.update(isExist.price_id!, {
      active: false,
    });

    const newPrice = await stripe.prices.create({
      unit_amount: plan.price * 100,
      currency: 'usd',
      product: product.id,
      recurring: {
        interval: plan.recurring||isExist.recurring,
      }
    });
    const payment_link = await stripe.paymentLinks.create({
      line_items: [
        {
          price: newPrice.id,
          quantity: 1,
        },
      ],
    });
    plan.price_id = newPrice.id;
    plan.payment_link = payment_link.url;
  }
  const updatePackage = await Package.findByIdAndUpdate(id, plan, {
    new: true,
  });
  return updatePackage;
};

const deletePackageFromDb = async (id: string) => {
  const isExist = await Package.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Package not found');
  }
  const product = await stripe.products.update(isExist.product_id!, {
    active: false,
  });
  const price = await stripe.prices.update(isExist.price_id!, {
    active: false,
  })
  const deletePackage = await Package.findByIdAndUpdate(id, {
      status: 'deleted',
  }   
  )

  return deletePackage;
}
// aoll user


export const PackageService = {
  createPlanIntoDb,
  getAllPackageFromDb,
  updatePackageFromDb,
  deletePackageFromDb,
}