import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import QrCodeIcon from "@mui/icons-material/QrCode";
import axios from "axios";

interface Errors {
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>();
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let valid = true;
    var newErrors: Errors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  useEffect(() => {
    if (errors && errors.username !== undefined && errors.username !== "") {
      toast.error(errors.username);
    }
    if (errors && errors.password !== undefined && errors.password !== "") {
      toast.error(errors.password);
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const valid = validate();
    if (valid) {
      setIsLoading(true);

      try {
        const response = await axios.post("http://localhost:8000/users/login", {
          username,
          password,
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.data.Token.token);
          toast.success(response.data.message, {
            duration: 1000,
          });
          setIsLoading(false);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          toast.error("Invalid credentials. Please try again.");
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response && error.response.data) {
          toast.error(
            typeof error.response.data === "string"
              ? error.response.data
              : error.response.data.message || "Server error"
          );
        } else {
          toast.error("Network error or server not reachable");
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          width: "100%",
          maxWidth: 450,
          borderRadius: 2,
        }}
      >
        <Toaster />
        <Box
          sx={{
            flexDirection: "row",
            gap: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QrCodeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              lineHeight: 1,
            }}
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
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 1,
              backgroundColor: "#57C785",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/signup" fontWeight="bold">
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
