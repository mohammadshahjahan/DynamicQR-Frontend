import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
  Tooltip,
  Link,
  Divider,
  Button,
  CardActions,
  TableContainer,
} from "@mui/material";
import DownloadableQR from "../components/DownloadableQR";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { checkAuth } from "../utils/checkAuth";
import { qrThunk } from "../redux/features/qr/qrThunk";
import { setPageNumber } from "../redux/features/qr/qrSlice";
import { formatDateIndian } from "../utils/dateformatter";
import EditQR from "../EditQR/EditQR";

const ResponsiveGridItem = ({
  size,
  children,
}: {
  size: any;
  children: React.ReactNode;
}) => (
  <Grid item {...size}>
    {children}
  </Grid>
);

const QRDetailsCard = ({ details, qrID }: { details: any; qrID: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 3,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
        borderLeft: "4px solid #4caf50",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#2e7d32",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#2e7d32">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM19 19h-2v-2h2v2zM21 21h-4v-2h2v-2h2v4z" />
          </svg>
          QR Details
        </Typography>
        <Grid container spacing={3} columns={{ xs: 1, md: 2 }}>
          <ResponsiveGridItem size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#616161", fontWeight: 500 }}
            >
              Name
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>{details.name}</Typography>
          </ResponsiveGridItem>

          <ResponsiveGridItem size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#616161", fontWeight: 500 }}
            >
              URI
            </Typography>
            <Tooltip title={details.uri}>
              <Link
                href={details.uri}
                target="_blank"
                rel="noopener"
                noWrap
                sx={{
                  color: "#2e7d32",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {details.uri.length > 30
                  ? `${details.uri.substring(0, 30)}...`
                  : details.uri}
              </Link>
            </Tooltip>
          </ResponsiveGridItem>

          <ResponsiveGridItem size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#616161", fontWeight: 500 }}
            >
              QR Type
            </Typography>
            <Chip
              label={details.qr_type}
              sx={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                fontWeight: 500,
              }}
            />
          </ResponsiveGridItem>

          <ResponsiveGridItem size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#616161", fontWeight: 500 }}
            >
              Status
            </Typography>
            <Chip
              label={details.status ? "Active" : "Inactive"}
              sx={{
                backgroundColor: details.status ? "#e8f5e9" : "#f5f5f5",
                color: details.status ? "#2e7d32" : "#9e9e9e",
                fontWeight: 500,
                border: details.status
                  ? "1px solid #81c784"
                  : "1px solid #e0e0e0",
              }}
            />
          </ResponsiveGridItem>

          <ResponsiveGridItem size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#616161", fontWeight: 500 }}
            >
              Created At
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {formatDateIndian(details.created_at)}
            </Typography>
          </ResponsiveGridItem>

          <ResponsiveGridItem size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#616161", fontWeight: 500 }}
            >
              Updated At
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {formatDateIndian(details.updated_at)}
            </Typography>
          </ResponsiveGridItem>
        </Grid>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Edit
        </Button>
        <Divider sx={{ mb: 2, mt: 2, borderColor: "#e0e0e0" }} />
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#616161",
              fontWeight: 500,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#616161">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
            Download QR Code
          </Typography>
          <DownloadableQR qrID={qrID} />
        </Box>
        <EditQR details={details} qrID={qrID} open={open} setOpen={setOpen} />
      </CardContent>
    </Card>
  );
};

const QRHistoryTable = ({
  history,
}: {
  history: { id: number; uri: string; count: number }[];
}) => (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e0e0e0",
    }}
  >
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
          <TableCell sx={{ fontWeight: 600, color: "#424242" }}>URI</TableCell>
          <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
            Scans
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((row, index) => (
          <TableRow
            key={row.id}
            sx={{
              "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <TableCell>
              <Tooltip title={row.uri}>
                <Link
                  href={row.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  noWrap
                  sx={{
                    color: "#2e7d32",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {row.uri.length > 40
                    ? `${row.uri.substring(0, 40)}...`
                    : row.uri}
                </Link>
              </Tooltip>
            </TableCell>
            <TableCell sx={{ fontWeight: 500 }}>{row.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const QR = () => {
  const { qr_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const qrIdNumber = Number(qr_id);

  const { data, error, isLoading, paginatedPage } = useSelector(
    (state: RootState) => state.qr
  );

  useEffect(() => {
    async function authCheck() {
      const auth = await checkAuth();
      if (!auth) navigate("/login");
    }

    if (isNaN(qrIdNumber)) {
      navigate("/not-found");
    } else {
      authCheck();
      dispatch(qrThunk({ pageNumber: paginatedPage, qrID: qrIdNumber }));
    }
  }, [qrIdNumber, paginatedPage, dispatch, navigate]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPageNumber(value));
    dispatch(qrThunk({ pageNumber: value, qrID: qrIdNumber }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          backgroundColor: "#4caf50",
          color: "white",
          p: 3,
          borderRadius: 3,
          mb: 4,
          boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM19 19h-2v-2h2v2zM21 21h-4v-2h2v-2h2v4z" />
          </svg>
          QR History for ID: {qrIdNumber}
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          {error}
        </Alert>
      )}

      {data.details && (
        <QRDetailsCard details={data.details} qrID={qrIdNumber} />
      )}

      {!isLoading && data.history && data.history.length > 0 ? (
        <>
          <QRHistoryTable history={data.history} />

          <Box
            display="flex"
            justifyContent="center"
            mt={4}
            mb={2}
            sx={{
              backgroundColor: "white",
              p: 2,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Pagination
              count={data.info?.total_pages || 1}
              page={paginatedPage}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#4caf50",
                  borderColor: "#e0e0e0",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#e8f5e9",
                  color: "#2e7d32",
                  fontWeight: 600,
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#e8f5e9",
                },
              }}
            />
          </Box>
        </>
      ) : (
        !isLoading && (
          <Box
            sx={{
              backgroundColor: "white",
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No history found for this QR code
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              This QR code hasn't been scanned yet.
            </Typography>
          </Box>
        )
      )}
    </Container>
  );
};

export default QR;
