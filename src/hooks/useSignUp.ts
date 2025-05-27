import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SignUpErrors, SignUpCredentials } from "../types/auth.types";
import { signUpUser, storeAuthToken, redirectToDashboard, handleAuthError,validateSignUpForm } from "../utils/auth.utils";
import { AUTH_CONSTANTS } from "../constants/auth.constants";

export const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<SignUpErrors>();
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

    const { isValid, errors: validationErrors } = validateSignUpForm(
      username, 
      password, 
      email, 
      name
    );
    setErrors(validationErrors);

    if (!isValid) return;

    setIsLoading(true);

    try {
      const credentials: SignUpCredentials = { username, password, email, name };
      const response = await signUpUser(credentials);

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
    email,
    setEmail,
    name,
    setName,
    isLoading,
    handleSubmit,
  };
};
