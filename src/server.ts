import express from 'express';

import deployConfig from './configs/deploy';

import app from './app';

const server = express();

server.use(app);

server.listen(deployConfig.port, () => console.log(`Server running on port ${deployConfig.port}`));
