export const AppDbConfig = () => ({
  host: process.env.APP_DB_HOST,
  port: parseInt(process.env.APP_DB_PORT || '3306', 10),
  username: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  database: process.env.APP_DB_NAME,
});

export const AdmDatabaseConfig = () => ({
  host: process.env.ADM_DB_HOST,
  port: parseInt(process.env.ADM_DB_PORT || '3306', 10),
  username: process.env.ADM_DB_USERNAME,
  password: process.env.ADM_DB_PASSWORD,
  database: process.env.ADM_DB_NAME,
});

export const PplDatabaseConfig = () => ({
  host: process.env.PPL_DB_HOST,
  port: parseInt(process.env.PPL_DB_PORT || '3306', 10),
  username: process.env.PPL_DB_USERNAME,
  password: process.env.PPL_DB_PASSWORD,
  database: process.env.PPL_DB_NAME,
});

export const TapDatabaseConfig = () => ({
  host: process.env.TAP_DB_HOST,
  port: parseInt(process.env.TAP_DB_PORT || '3306', 10),
  username: process.env.TAP_DB_USERNAME,
  password: process.env.TAP_DB_PASSWORD,
  database: process.env.TAP_DB_NAME,
});
