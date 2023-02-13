import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: ['error'],
  entities: ['src/Domain/**/*.entity{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations'
};

export const dataSource = new DataSource(dataSourceOptions);
