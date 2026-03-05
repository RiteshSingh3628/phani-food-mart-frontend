const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const URLS = {
  AUTH: {
    LOGIN: `${BASE_URL}api/auth/login`,
    SIGNUP: `${BASE_URL}api/auth/register`,
    REFRESH: `${BASE_URL}api/auth/refresh-token`,
  },
};

export default URLS;
