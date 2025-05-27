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
import { useSignUp } from "../hooks/useSignUp";
import { authStyles } from "../styles/authStyles";
import { AUTH_CONSTANTS } from "../constants/auth.constants";

const SignUp: React.FC = () => {
  const {
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
  } = useSignUp();

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
            Sign Up To HoloQr
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
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              "Sign Up"
            )}
          </Button>

          <Box sx={authStyles.linkSection}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href={AUTH_CONSTANTS.ROUTES.LOGIN} fontWeight="bold">
                Log In
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
