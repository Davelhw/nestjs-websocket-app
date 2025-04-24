// src/config/config.type.ts

export interface AppConfigType {
  app_port: number;
  app_environment: string;
  app_corsWhitelist: string[];
}

export interface AppDbConfigType {
  db_host: string;
  db_port: number;
  db_username: string;
  db_password: string;
  db_database: string;
}

export interface AdmDatabaseConfigType {
  db_host: string;
  db_port: number;
  db_username: string;
  db_password: string;
  db_database: string;
}

export interface JwtConfigType {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}
