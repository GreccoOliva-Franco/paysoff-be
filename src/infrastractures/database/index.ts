import { DataSource } from 'typeorm';

import databaseConfig from '../../configs/database';

export default new DataSource(databaseConfig);
