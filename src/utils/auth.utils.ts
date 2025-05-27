import { LoginErrors,SignUpErrors } from "../types/auth.types";
import axios from "axios";
import { LoginCredentials, SignUpCredentials, AuthResponse } from "../types/auth.types";
import { AUTH_CONSTANTS } from "../constants/auth.constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export const validateLoginForm = (
  username: string, 
  password: string
): { isValid: boolean; errors: LoginErrors } => {
  let isValid = true;
  const errors: LoginErrors = { username: "", password: "" };

  if (!username.trim()) {
    errors.username = "Username is required";
    isValid = false;
  }

  if (!password.trim()) {
    errors.password = "Password is required";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateSignUpForm = (
  username: string,
  password: string,
  email: string,
  name: string
): { isValid: boolean; errors: SignUpErrors } => {
  let isValid = true;
  const errors: SignUpErrors = { username: "", password: "", email: "", name: "" };

  if (!username.trim()) {
    errors.username = "Username is required";
    isValid = false;
  }

  if (!password.trim()) {
    errors.password = "Password is required";
    isValid = false;
  }

  if (!email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Invalid email format";
    isValid = false;
  }

  if (!name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  return { isValid, errors };
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    AUTH_CONSTANTS.API_ENDPOINTS.LOGIN,
    credentials
  );
  return response.data;
};

export const signUpUser = async (credentials: SignUpCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    AUTH_CONSTANTS.API_ENDPOINTS.SIGNUP,
    credentials
  );
  return response.data;
};

export const storeAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, token);
};

export const redirectToDashboard = (): void => {
  setTimeout(() => {
    window.location.href = AUTH_CONSTANTS.ROUTES.DASHBOARD;
  }, AUTH_CONSTANTS.REDIRECT_DELAY);
};

export const handleAuthError = (error: any): string => {
  return error.response?.data?.message || 
         error.response?.data || 
         "Network error or server not reachable";
};
