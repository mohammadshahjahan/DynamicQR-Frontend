import { Button, Container, Typography, Paper, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 80,
            color: theme.palette.error.main,
            mb: 2,
          }}
        />

        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            borderRadius: 1,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Return Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
