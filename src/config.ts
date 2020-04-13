import { parse } from 'url';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export interface Config {
  port: number;
  mysql: TypeOrmModuleOptions;
}

const dbUrl = process.env.MYSQL || 'mysql://root:password@localhost:3306/keeners';

export default (): Config => ({
  port: (process.env.PORT && parseInt(process.env.PORT, 10)) || 3001,
  mysql: {
    type: 'mysql',
    url: dbUrl,
    database: parse(dbUrl).pathname?.substr(1),
    autoLoadEntities: true,
    synchronize: true,
    logging: ['error'],
  },
});
