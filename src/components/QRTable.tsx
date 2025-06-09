import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { formatDateIndian } from "../utils/dateformatter";
import { useNavigate } from "react-router-dom";

interface QRTableProps {
  viewMore?: boolean;
  title: string;
  data: any[] | null | undefined;
  error: string | null;
  loading: boolean;
}

const QRTable: React.FC<QRTableProps> = ({
  data,
  title,
  viewMore = false,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Paper
        elevation={3}
        sx={{
          width: "auto",
          maxWidth: "100%",
          overflowX: "auto",
          m: 5,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#388e3c",
            mb: 2,
          }}
          fontFamily={"cursive"}
        >
          {title}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="success" />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          width: "auto",
          maxWidth: "100%",
          overflowX: "auto",
          m: 5,
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#388e3c",
          }}
          fontFamily={"cursive"}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="error"
          sx={{ textAlign: "center", mt: 2 }}
        >
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          width: "auto",
          maxWidth: "100%",
          overflowX: "auto",
          m: 5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            p: 2,
            fontWeight: "bold",
            color: "#388e3c",
          }}
          fontFamily={"cursive"}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          No QR Available
        </Typography>
      </Paper>
    );
  }

  const columns = ["Name", "Type", "Created At", "Updated At", "Status"];

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        width: "auto",
        maxWidth: "100%",
        overflowX: "auto",
        m: 5,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: "bold",
          color: "#388e3c",
        }}
        fontFamily={"cursive"}
      >
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  fontWeight: "bold",
                  fontFamily: "cursive",
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                ":hover": {
                  bgcolor: "#f5f5f5",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                // window.location.href = `/qr/${row?.qr_id}`;
                navigate(`/qr/${row?.qr_id}`);
              }}
            >
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.qr_type}</TableCell>
              <TableCell>{formatDateIndian(row?.created_at)}</TableCell>
              <TableCell>{formatDateIndian(row?.updated_at)}</TableCell>
              <TableCell>{row?.status ? "Active" : "Not Active"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewMore && (
        <Typography
          variant="body2"
          sx={{ p: 2, textAlign: "right" }}
          onClick={() => {
            // window.location.href = `/qr-codes/${data[0]?.qr_type}`;
            navigate(`/qr-codes/${data[0]?.qr_type}`);
          }}
          className="cursor-pointer"
        >
          View More...
        </Typography>
      )}
    </TableContainer>
  );
};

export default QRTable;
