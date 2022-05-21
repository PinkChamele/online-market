const AUTH_CONSTANTS = {
  JWT: {
    EXPIRATION: {
      ACCESS_TOKEN: '1d',
      REFRESH_TOKEN: '7d',
    },
  },
  REDIS: {
    EXPIRATION: {
      REFRESH_TOKEN: 604800,
    },
  },
};

export default AUTH_CONSTANTS;
