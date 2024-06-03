export const configLoad = () => {
  return {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    client_url: process.env.CLIENT_URL,
    api_url: process.env.API_URL,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    origins: splitString(process.env.ORIGINS, ','),
    mail: {
      address: process.env.MAIL_ADDRESS,
      password: process.env.MAIL_PASSWORD,
    },
  };
};

const splitString = (value: string, splitter: string | RegExp): string[] => {
  if (!value) return ['*'];

  return value.split(splitter);
};
