import path from 'path';
import express, {Express} from "express";
import {config} from "dotenv";
import {globalErrorHandlers, norFoundErrorHandler} from "@exceptions/errorHandlers";
import '@exceptions/asyncErrorHandling';
import session from 'express-session';
import APIRoutes from '@routes/api'

config({path: './.env'});

const app: Express = express();

app.use(session({
    secret: 'ajnsdfkjnaskjfnjk8978998*&(*^(*($E*(',
    resave: false
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', APIRoutes)

app.all('*', norFoundErrorHandler);
app.use(globalErrorHandlers)

export default app;
