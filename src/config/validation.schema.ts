// src/config/validation.schema.ts

import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // App
  APP_PORT: Joi.number().default(9960),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('4h'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('6h'),

  // Redis
  // USE_REDIS: Joi.boolean().default(true),
  // REDIS_HOST: Joi.string().required(),
  // REDIS_PORT: Joi.number().default(6379),
  // REDIS_PASSWORD: Joi.string().allow('').optional(),

  // DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  // App Extras
  CORS_WHITELIST: Joi.string().required(),
});
