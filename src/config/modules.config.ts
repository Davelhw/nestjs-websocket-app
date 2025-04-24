import { AppConfig } from './app.config';
import { AdmDatabaseConfig } from './database.config';
import { validationSchema } from './validation.schema';
import { JwtConfig } from './jwt.config'; // 🔐 import JWT config

export const ConfigModules = {
  load: [AppConfig, AdmDatabaseConfig, JwtConfig],
  validationSchema,
};
