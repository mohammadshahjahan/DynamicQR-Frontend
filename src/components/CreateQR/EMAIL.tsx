import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  Paper,
  styled,
  useTheme,
} from "@mui/material";
import { Link as LinkIcon, Edit as EditIcon } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "90%",
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

const EMAIL = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const qrType = "email";
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid URL");
      return;
    }

    if (!name) {
      toast.error("Please enter a name");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://dynamicqr-4dwm.onrender.com/create-qr",
        {
          uri: `mailto:${email}`,
          name: name,
          qr_type: qrType,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        toast.success("QR Code created successfully!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <StyledPaper elevation={3}>
        <Box
          mb={4}
          textAlign="center"
          sx={{
            "& > *": {
              mb: 2,
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: {
                xs: "1.0rem", // Smaller on mobile
                sm: "1.75rem", // Slightly larger on small tablets
                md: "2.125rem", // Default size on larger screens
              },
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <LinkIcon
                color="primary"
                sx={{
                  mr: 1.5,
                  fontSize: {
                    xs: "1.25rem", // Smaller icon on mobile
                    sm: "1.5rem", // Default icon size
                  },
                }}
              />
              URL QR Code Generator
            </Box>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              fontSize: {
                xs: "0.75rem", // Smaller on mobile
                sm: "0.875rem", // Default size
              },
            }}
          >
            Create a QR code that links to any website URL
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box mb={3.5}>
            <TextField
              fullWidth
              label="Destination Email"
              variant="outlined"
              placeholder="abc@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon
                      color="action"
                      sx={{
                        fontSize: {
                          xs: "1rem", // Smaller icon on mobile
                          sm: "1.25rem", // Default icon size
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: {
                    xs: "0.875rem", // Smaller label on mobile
                    sm: "1rem", // Default label size
                  },
                },
              }}
            />
          </Box>

          <Box mb={4.5}>
            <TextField
              fullWidth
              label="QR Code Name"
              variant="outlined"
              placeholder="My Website QR"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon
                      color="action"
                      sx={{
                        fontSize: {
                          xs: "1rem", // Smaller icon on mobile
                          sm: "1.25rem", // Default icon size
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: {
                    xs: "0.875rem", // Smaller label on mobile
                    sm: "1rem", // Default label size
                  },
                },
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={loading || !email || !name}
            endIcon={
              loading ? <CircularProgress size={24} color="inherit" /> : null
            }
            sx={{
              py: 1.5,
              borderRadius: "12px",
              fontSize: {
                xs: "0.875rem", // Smaller text on mobile
                sm: "1rem", // Default size
              },
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Creating QR Code..." : "Generate QR Code"}
          </Button>
        </form>
      </StyledPaper>
    </Box>
  );
};

export default EMAIL;
