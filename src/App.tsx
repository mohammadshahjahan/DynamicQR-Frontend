import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./Home";
import Login from "./User/Login";
import SignUp from "./User/SignUp";
import NotFoundPage from "./components/NotFoundPage";
import Dashboard from "./Dashboard";
import URL from "./components/CreateQR/URL";
import SMS from "./components/CreateQR/SMS";
import EMAIL from "./components/CreateQR/EMAIL";

function App() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/qr-codes/:qr_type" element={<Dashboard />} />
          <Route path="/qr/:qr_id" element={<Home />} />
          <Route path="/create-qr/url" element={<URL />} />
          <Route path="/create-qr/sms" element={<SMS />} />
          <Route path="/create-qr/email" element={<EMAIL />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
