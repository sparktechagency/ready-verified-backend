import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import passport from "./config/passport";
import session from "express-session";
import { handleStripeWebhook } from './webhook/handleStripeWebhook';
const app = express();

//morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

// webhook
app.post("/api/webhook",express.raw({type: "application/json"}), handleStripeWebhook);

//body parser
app.use(cors({
  origin:["http://10.10.7.95:3000","http://10.10.7.95:3001","http://localhost:4003","http://localhost:3000","http://localhost:3001","https://ready-verified-client.vercel.app","http://92.205.234.176:4003"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//file retrieve

app.use(express.static('uploads'));
app.use('/asset',express.static('asset'));

//router
app.use('/api/v1', router);

//live response
app.get('/', (req: Request, res: Response) => {
  const date = new Date(Date.now());
  res.send(
    `<h1 style="text-align:center; color:#173616; font-family:Verdana;">Beep-beep! The server is alive and kicking.</h1>
    <p style="text-align:center; color:#173616; font-family:Verdana;">${date}</p>
    `
  );
});

//global error handle
app.use(globalErrorHandler);

//handle not found route;
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
