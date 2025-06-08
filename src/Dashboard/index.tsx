import { useEffect } from "react";
import { dashboardThunk } from "../redux/features/dashboard/dashboardThunk";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { checkAuth } from "../utils/checkAuth";
import Profile from "./Profile";
import { urlThunk } from "../redux/features/url/urlThunk";
import { smsThunk } from "../redux/features/sms/smsThunk";
import { emailThunk } from "../redux/features/email/emailThunk";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, data } = useSelector(
    (state: RootState) => state.dashboard
  );

  const { data: smsData } = useSelector((state: RootState) => state.sms);

  const { data: urlData } = useSelector((state: RootState) => state.url);

  const { data: emailData } = useSelector((state: RootState) => state.email);

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
    if (data === null) {
      dispatch(dashboardThunk());
    }

    if (smsData === null) {
      dispatch(smsThunk(0));
    }

    if (urlData === null) {
      dispatch(urlThunk(0));
    }

    if (emailData === null) {
      dispatch(emailThunk(0));
    }
  }, [dispatch, data, smsData, urlData, emailData]);

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard data...</div>;
  }

  if (error || data === null) {
    return (
      <div className="text-center py-8 text-red-500">
        {data === null ? "No data available" : "Error " + error}

        <button
          onClick={() => dispatch(dashboardThunk())}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div>
      <Profile />
    </div>
  );
};

export default Dashboard;
