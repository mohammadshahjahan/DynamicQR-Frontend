import { Pagination, Stack } from "@mui/material";
import React, { ChangeEvent, useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { checkAuth } from "../utils/checkAuth";
import { emailPaginatedThunk } from "../redux/features/email/emailThunk";
import { setPageNUmber } from "../redux/features/email/emailSlice";
import QRTable from "../components/QRTable";

const Email = () => {
  const dispatch = useAppDispatch();
  const { paginatedData, paginatedError, paginatedLoading, paginatedPage } =
    useSelector((state: RootState) => state.email);

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
    dispatch(emailPaginatedThunk(paginatedPage));
  }, [dispatch, paginatedPage]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setPageNUmber(value));
  };

  if (paginatedLoading) {
    return <div className="text-center py-8">Loading Email QR Codes...</div>;
  }

  if (paginatedError || paginatedData === null) {
    return (
      <div className="text-center py-8 text-red-500">
        {paginatedData === null
          ? "No data available"
          : "Error " + paginatedError}

        <button
          onClick={() => dispatch(emailPaginatedThunk(paginatedPage || 10))}
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
        title="Recent Email Codes"
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

export default Email;
