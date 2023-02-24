import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  port: +process.env.TYPEORM_PORT,
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  password: process.env.TYPEORM_PASSWORD,
  username: process.env.TYPEORM_USERNAME,
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
