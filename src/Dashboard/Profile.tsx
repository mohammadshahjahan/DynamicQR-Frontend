import { Box, Divider, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import dashboardImage from "../assests/dashboard.jpg";

const Profile = () => {
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );
  if (isLoading) {
    return (
      <div className=" bg-[#f5f5f5] p-2 min-h-[100vh] text-center py-8">
        Loading profile data...
      </div>
    );
  } else if (error || data === null) {
    return (
      <div className="bg-[#f5f5f5] p-2 min-h-[100vh] text-center py-8 text-red-500">
        {data === null ? "No data available" : "Error " + error}
      </div>
    );
  }
  return (
    <div>
      <div className="bg-[#f5f5f5] p-2 min-h-[100vh]">
        <Box
          sx={{
            padding: 5,
            flexDirection: {
              xs: "column",
              md: "row",
            },
            display: "flex",
            gap: {
              xs: 1,
              md: 3,
            },
            alignItems: "stretch",
          }}
        >
          <Box
            component="img"
            src={dashboardImage}
            alt="Dashboard Pic"
            sx={{
              width: {
                xs: "100%",
                md: "20%",
              },
              height: {
                xs: "auto",
                md: "auto",
              },
              maxWidth: "100%",
              maxHeight: "245px",
              objectFit: "cover", // I added this to crop the image just to be asthetically pleasing
              borderRadius: 2,
            }}
          />
          <Paper
            elevation={3}
            className="p-4 bg-white shadow-md rounded-lg w-full"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minHeight: { xs: "auto", md: "unset" },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#388e3c",
              }}
            >
              User Profile
            </Typography>
            <Divider />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {data.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  Username
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {data.username}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {data.email}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  Total Scans
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {data.count}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
