import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import apiRoutes from './app.routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet());

app.use('/api', apiRoutes);

export default app;
