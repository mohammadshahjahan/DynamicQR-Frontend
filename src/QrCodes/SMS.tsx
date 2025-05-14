import { Pagination, Stack } from "@mui/material";
import React, { ChangeEvent, useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { checkAuth } from "../utils/checkAuth";
import { smsPaginatedThunk } from "../redux/features/sms/smsThunk";
import { setPageNumber } from "../redux/features/sms/smsSlice";
import QRTable from "../components/QRTable";

const SMS = () => {
  const dispatch = useAppDispatch();
  const { paginatedData, paginatedError, paginatedLoading, paginatedPage } =
    useSelector((state: RootState) => state.sms);

  useEffect(() => {
    async function authCheck() {
      const auth = await checkAuth();
      if (!auth) {
        window.location.href = "/login";
      }
    }
    authCheck();
  }, []);

  useEffect(() => {
    dispatch(smsPaginatedThunk(paginatedPage));
  }, [dispatch, paginatedPage]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setPageNumber(value));
  };

  if (paginatedLoading) {
    return <div className="text-center py-8">Loading SMS QR Codes...</div>;
  }

  if (paginatedError || paginatedData === null) {
    return (
      <div className="text-center py-8 text-red-500">
        {paginatedData === null
          ? "No data available"
          : "Error " + paginatedError}

        <button
          onClick={() => dispatch(smsPaginatedThunk(paginatedPage || 10))}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div>
      <QRTable
        title="Recent SMS Codes"
        data={paginatedData?.qrs}
        error={paginatedError}
        loading={paginatedLoading}
      />
      <Stack spacing={2}>
        <Pagination
          count={paginatedData?.info.total_pages}
          shape="rounded"
          page={paginatedPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default SMS;
