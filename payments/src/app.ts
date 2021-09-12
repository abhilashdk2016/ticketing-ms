import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, currentUser, NotFoundError } from '@abhilashdk/common';
import { createchargeRouter } from './routes/new';


const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));

// In chrome just type - thisisunsafe
app.use(currentUser);
app.use(createchargeRouter);

app.all('*', async (req, res, next) => { throw new NotFoundError() });


app.use(errorHandler);

export { app };
