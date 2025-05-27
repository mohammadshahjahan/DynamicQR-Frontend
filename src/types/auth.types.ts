export interface LoginErrors {
  username: string;
  password: string;
}

export interface SignUpErrors {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  Token: {
    token: string;
  };
  message: string;
}
