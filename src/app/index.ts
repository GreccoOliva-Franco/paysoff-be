import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import apiRoutes from './app.routes';
import { noEndpointMiddleware } from '../common/middlewares/no-endpoint.middleware';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet());

app.use('/api', apiRoutes);

app.use(noEndpointMiddleware);

export default app;
