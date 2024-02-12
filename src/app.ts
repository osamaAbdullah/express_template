import { logger } from "@/middlewares/logger.middleware";
import initializePassport from "@config/passport";
import '@exceptions/asyncErrorHandling';
import { globalErrorHandlers, notFoundErrorHandler } from "@exceptions/errorHandlers";
import APIRoutes from '@routes/api';
import cors from 'cors';
import { config } from "dotenv";
import express, { Express } from "express";
import session from 'express-session';
import path from 'path';
import { URL } from 'url';

config({ path: './.env' });

const app: Express = express();

app.use(cors({ credentials: true }));

app.use(session({
    secret: 'ajnsdfkjnaskjfnjk8978998*&(*^(*($E*(',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // second/minute/hour/day
}));

initializePassport(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);

app.use('/api/v1', APIRoutes)

app.all('*', notFoundErrorHandler);
app.use(globalErrorHandlers)

export default app;
