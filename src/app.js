import path from 'path';
import express from 'express';
import 'dotenv/config';
import { URL } from "url";
import { globalErrorHandlers, norFoundErrorHandler } from "#root/exceptions/errorHandlers";
import '#root/exceptions/asyncErrorHandling';

import APIRoutes from '#routes/api'

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', APIRoutes)

app.all('*', norFoundErrorHandler);
app.use(globalErrorHandlers)

export default app;
