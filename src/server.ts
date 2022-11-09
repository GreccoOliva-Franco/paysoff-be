import express from 'express';

import deployConfig from './configs/deploy';

const server = express();

server.listen(deployConfig.port, () => console.log(`Server running on port ${deployConfig.port}`));
