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

const pages = ["Dashboard"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
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
          <QrCodeIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
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
            }}
          >
            HoloQR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleDashboardClick}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleDashboardClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

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
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                <MenuItem
                  key="Logout"
                  onClick={() => handleAuthAction("Logout")}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                [
                  <MenuItem
                    key="Login"
                    onClick={() => handleAuthAction("Login")}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="Signup"
                    onClick={() => handleAuthAction("Signup")}
                  >
                    <Typography textAlign="center">Signup</Typography>
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
