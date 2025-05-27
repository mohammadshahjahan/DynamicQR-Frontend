import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useLogin } from "../hooks/useLogin";
import { authStyles } from "../styles/authStyles";
import { AUTH_CONSTANTS } from "../constants/auth.constants";

const Login: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    handleSubmit,
  } = useLogin();

  return (
    <Box sx={authStyles.container}>
      <Paper elevation={3} sx={authStyles.paper}>
        <Toaster />

        <Box sx={authStyles.header}>
          <QrCodeIcon sx={authStyles.icon} />
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={authStyles.title}
          >
            Login To HoloQr
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={authStyles.submitButton}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>

          <Box sx={authStyles.linkSection}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href={AUTH_CONSTANTS.ROUTES.SIGNUP} fontWeight="bold">
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
