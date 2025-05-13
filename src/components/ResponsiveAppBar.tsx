import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import profileImage from "../assests/profile.jpg";

const pages = ["Dashboard", "Create QR"];
const qrs = ["URL", "SMS", "Email"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElQR, setAnchorElQR] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const onMountingNavbAr = async () => {
      const auth = await checkAuth();
      setIsLoggedIn(auth);
    };
    onMountingNavbAr();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenQRMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElQR(event.currentTarget);
  };

  const handleCloseQRMenu = () => {
    setAnchorElQR(null);
  };

  const handleQRClick = (type: string) => {
    handleCloseQRMenu();
    navigate(`/create-qr/${type.toLowerCase()}`);
  };

  const handleAuthAction = (action: string) => {
    handleCloseUserMenu();
    if (action === "Logout") {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate(`/${action.toLowerCase()}`);
    }
  };

  const handleDashboardClick = (tab: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (tab === "Dashboard") {
      navigate("/dashboard");
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #57C785 0%, #57C785 100%)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <QrCodeIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            HoloQR
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={(e) => {
                    if (page === "Create QR") {
                      handleOpenQRMenu(e);
                    } else {
                      handleDashboardClick(page);
                    }
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <QrCodeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Poppins",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HoloQR
          </Typography>

          {/* Desktop Menu Items */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => {
                  if (page === "Create QR") {
                    handleOpenQRMenu(e);
                  } else {
                    handleDashboardClick(page);
                  }
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* User Avatar or Login/Signup */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isLoggedIn ? "Open settings" : "Account options"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!isLoggedIn ? (
                  <AccountCircleIcon
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.5rem",
                        md: "2rem",
                      },
                    }}
                  />
                ) : (
                  <Avatar alt="User" src={profileImage} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {isLoggedIn ? (
                <MenuItem onClick={() => handleAuthAction("Logout")}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => handleAuthAction("Login")}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleAuthAction("Signup")}>
                    <Typography textAlign="center">Signup</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* QR Type Submenu */}
          <Menu
            id="qr-menu"
            anchorEl={anchorElQR}
            open={Boolean(anchorElQR)}
            onClose={handleCloseQRMenu}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {qrs.map((type) => (
              <MenuItem key={type} onClick={() => handleQRClick(type)}>
                <Typography textAlign="center">{type}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
