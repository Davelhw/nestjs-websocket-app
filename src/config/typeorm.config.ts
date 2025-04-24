import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

// 🔵 Admin DB
export const AdminDataSource = new DataSource({
  type: 'mysql',
  host: process.env.ADM_DB_HOST,
  port: parseInt(process.env.ADM_DB_PORT || '3306', 10),
  username: process.env.ADM_DB_USERNAME,
  password: process.env.ADM_DB_PASSWORD,
  database: process.env.ADM_DB_NAME,
  entities: [path.resolve(__dirname, '../**/*.entity.{js,ts}')],
  migrations: [path.resolve(__dirname, '../database/migrations/*.{ts,js}')],
  synchronize: false,
  logging: true,
} as DataSourceOptions);
