import { API_BASE_URL } from "./api";

export const AUTH_CONSTANTS = {
  API_ENDPOINTS: {
    LOGIN: `${API_BASE_URL}/users/login`,
    SIGNUP: `${API_BASE_URL}/users/signup`,
  },
  ROUTES: {
    DASHBOARD: "/dashboard",
    SIGNUP: "/signup",
    LOGIN: "/login",
  },
  STORAGE_KEYS: {
    TOKEN: "token",
  },
  TOAST_DURATION: 1000,
  REDIRECT_DELAY: 1000,
  HTTP_STATUS: {
    SUCCESS_LOGIN: 200,
    SUCCESS_SIGNUP: 201,
  },
};