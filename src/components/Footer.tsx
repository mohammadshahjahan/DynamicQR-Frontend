import { Box, Container, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            <span className="font-bold text-black">©</span> 2025 Created by Mohd
            Shahjahan
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/mohd-shahjahan-887365227/"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                aria-label="GitHub"
                href="https://github.com/mohammadshahjahan"
                target="_blank"
                rel="noopener noreferrer"
                color="success"
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
