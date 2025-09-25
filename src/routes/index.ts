import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { PackageRoutes } from '../app/modules/package/package.route';
import { SubscriptionRoutes } from '../app/modules/subscription/subscription.route';
import { DisclaimerRoutes } from '../app/modules/disclaimer/disclaimer.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { AsCategoryRoutes } from '../app/modules/as_category/as_category.route';
import { AssessmentRoutes } from '../app/modules/assessment/assessment.route';
import { TemplateRoutes } from '../app/modules/template/template.route';
import { NotificationRoutes } from '../app/modules/notifcation/notifcation.route';
import { DashboardRoutes } from '../app/modules/dashboard/dashboard.route';
import { OrderRoutes } from '../app/modules/order/order.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path:"/package",
    route:PackageRoutes
  },
  {
    path:"/subscription",
    route:SubscriptionRoutes
  },
  {
    path:"/disclaimer",
    route:DisclaimerRoutes
  },
  {
    path:"/faq",
    route:FaqRoutes
  },
  {
    path:"/category",
    route:AsCategoryRoutes
  },
  {
    path:"/assessment",
    route:AssessmentRoutes
  },
  {
    path:"/template",
    route:TemplateRoutes
  },
  {
    path:"/notification",
    route:NotificationRoutes
  },
  {
    path:"/dashboard",
    route:DashboardRoutes
  },
  {
    path:"/order",
    route:OrderRoutes
  }
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
