import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import apiRoutes from './app.routes';

import { noEndpointHandler } from '../common/handlers/no-endpoint.handler';
import { errorHandler } from '../common/handlers/error.handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet());

app.use('/api', apiRoutes);

app.use('*', noEndpointHandler);

app.use(errorHandler);

export default app;
