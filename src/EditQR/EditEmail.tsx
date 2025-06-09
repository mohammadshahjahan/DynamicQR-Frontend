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
} from "@mui/material";
import { Link as LinkIcon, Edit as EditIcon } from "@mui/icons-material";

const EditEmail = ({ qr_id }: { qr_id: number }) => {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid URL");
      return;
    }
    if (!qr_id) {
      toast.error("QR ID is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        "https://dynamicqr-4dwm.onrender.com/update-qr",
        {
          uri: `mailto:${email}`,
          qr_id: `${qr_id}`,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        toast.success("QR Code updated successfully!");
        setTimeout(() => {
          window.location.href = `/qr/${qr_id}`;
        }, 2000);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
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
            Edit Email QR Code
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
          Edit a QR code that can be scanned to send an email. Enter the
          destination email address.
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

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={loading || !email || !qr_id}
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
          {loading ? "Editing QR Code..." : "Edit QR Code"}
        </Button>
      </form>
    </StyledPaper>
  );
};

export default EditEmail;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "90%",
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));
