import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LoginErrors, LoginCredentials } from "../types/auth.types";
import { loginUser, storeAuthToken, redirectToDashboard, handleAuthError, validateLoginForm } from "../utils/auth.utils";
import { AUTH_CONSTANTS } from "../constants/auth.constants";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([field, error]) => {
        if (error) {
          toast.error(error);
        }
      });
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateLoginForm(username, password);
    setErrors(validationErrors);

    if (!isValid) return;

    setIsLoading(true);

    try {
      const credentials: LoginCredentials = { username, password };
      const response = await loginUser(credentials);

      storeAuthToken(response.Token.token);
      toast.success(response.message, {
        duration: AUTH_CONSTANTS.TOAST_DURATION,
      });
      
      redirectToDashboard();
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    handleSubmit,
  };
};