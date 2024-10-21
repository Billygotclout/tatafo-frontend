import { Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import AuthContextProvider from "./providers/AuthContextProvider";
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import PrivateRoute from "./helpers/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import Sidenav from "./components/Sidenav";
import Chat from "./pages/Chat";

function App() {
  return (
    <AuthContextProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<SignUpPage />} />
        <Route path="/forgot-password" index element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Sidenav />}>
            <Route path="" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat/:userId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
