import { SxProps, Theme } from "@mui/material/styles";

export const authStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    p: 2,
    backgroundColor: "#f5f5f5",
  } as SxProps<Theme>,

  paper: {
    p: { xs: 2, sm: 4 },
    width: "100%",
    maxWidth: 450,
    borderRadius: 2,
  } as SxProps<Theme>,

  header: {
    flexDirection: "row",
    gap: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as SxProps<Theme>,

  title: {
    lineHeight: 1,
  } as SxProps<Theme>,

  icon: {
    display: { xs: "none", md: "flex" },
    mr: 1,
  } as SxProps<Theme>,

  submitButton: {
    mt: 2,
    py: 1.5,
    borderRadius: 1,
    backgroundColor: "#57C785",
  } as SxProps<Theme>,

  linkSection: {
    mt: 3,
    textAlign: "center",
  } as SxProps<Theme>,
};
