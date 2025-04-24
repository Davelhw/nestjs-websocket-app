export const AppConfig = () => ({
  app_port: parseInt(process.env.APP_PORT || '9960', 10),
  environment: process.env.NODE_ENV || 'development',
  corsWhitelist: (process.env.CORS_WHITELIST || '').split(','),
});
