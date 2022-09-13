require('dotenv').config();

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  postgres: process.env.DATABASE_URL,
  appUrl: process.env.APP_URL,
  hostUrl: process.env.HOST_URL,
  env: process.env.NODE_ENV,
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  },
  oneSignal: {
    appId: process.env.ONE_SIGNAL_APP_ID,
    apiKey: process.env.ONE_SIGNAL_API_KEY,
    url: process.env.ONE_SIGNAL_URL,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNTSID,
    authToken: process.env.TWILIO_AUTHTOKEN,
    fromPhoneNumber: process.env.TWILIO_FROM_PHONE_NUMBER,
  },
  emailServer: {
    host: process.env.EMAIL_SERVER_HOST,
    appId: process.env.EMAIL_SERVER_APP_ID,
    secretKey: process.env.EMAIL_SERVER_SECRET_KEY,
    fromEmail: process.env.EMAIL_SERVER_FROM_EMAIL,
    fromName: process.env.EMAIL_SERVER_FROM_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    lifeTime: process.env.JWT_LIFE_TIME,
    refreshTokenLifeTime: process.env.JWT_REFRESH_TOKEN_LIFE_TIME,
  },
  DEPTH_LIMIT_CONFIG: Number(process.env.QUERY_DEPTH_LIMIT) || 5,
  mongoose:{
  url:process.env.MONGODB_DATABASE_URL,
  options:{
    useUnifiedTopology: true,
    useNewUrlParser: true
}
  }
};

module.exports = config;
