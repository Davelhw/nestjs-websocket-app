// export const AppConfig = () => ({
//   port: process.env.APP_PORT || 9960,
//   environment: process.env.NODE_ENV || 'development',
// });

export const AppConfig = () => ({
  port: parseInt(process.env.APP_PORT || '9960', 10),
  environment: process.env.NODE_ENV || 'development',
  corsWhitelist: (process.env.CORS_WHITELIST || '').split(','),
  byInvitation: process.env.BY_INVITATION === '1',
  referralCodeLength: parseInt(process.env.REFERRAL_CODE_LENGTH || '8', 10),
  maxChildren: parseInt(process.env.MAX_CHILDREN || '2', 10),
});
