import { logger } from "@/middlewares/logger.middleware";
import initializePassport from "@config/passport";
import '@config/vinejs/register';
import '@exceptions/asyncErrorHandling';
import { globalErrorHandlers, notFoundErrorHandler } from "@exceptions/errorHandlers";
import APIRoutes from '@routes/api';
import cors from 'cors';
import { config } from "dotenv";
import express, { Express } from "express";
import path from 'path';
import { URL } from 'url';

config({ path: './.env' });

const app: Express = express();

await initializePassport(app);

app.use(cors({ credentials: true }));

// const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);

app.use('/api/v1', APIRoutes)

app.all('*', notFoundErrorHandler);
app.use(globalErrorHandlers)

export default app;
