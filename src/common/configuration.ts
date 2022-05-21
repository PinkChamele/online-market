export default () => ({
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGODB_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
