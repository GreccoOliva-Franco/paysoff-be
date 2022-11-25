import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import apiRoutes from './app.routes';

import { notFoundHandler } from '../common/handlers/no-endpoint.handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet());

app.use('/api', apiRoutes);

app.use('*', notFoundHandler);

export default app;
