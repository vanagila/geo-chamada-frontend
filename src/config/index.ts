export const config = {
  api: {
    url: import.meta.env.VITE_API_URL || 'https://geo-chamada-production.up.railway.app',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  },
  auth: {
    tokenKey: 'access_token',
    userKey: 'user',
  },
};

export default config;
