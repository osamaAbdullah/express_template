import path from 'path';
import express, {Express} from "express";
import {config} from "dotenv";
import {globalErrorHandlers, norFoundErrorHandler} from "@exceptions/errorHandlers";
import '@exceptions/asyncErrorHandling';
import session from 'express-session';
import APIRoutes from '@routes/api';
import initializePassport from "@config/passport";
import {logger} from "@/middlewares/logger.middleware";
// import cors from 'cors';

config({path: './.env'});

const app: Express = express();

// app.use(cors({
//     credentials: true
// }));

app.use(session({
    secret: 'ajnsdfkjnaskjfnjk8978998*&(*^(*($E*(',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24} // second/minute/hour/day
}));

initializePassport(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);

app.use('/api/v1',APIRoutes)

app.all('*', norFoundErrorHandler);
app.use(globalErrorHandlers)

export default app;
