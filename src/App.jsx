import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import AuthContextProvider from "./providers/AuthContextProvider";
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";

function App() {
  return (
    <AuthContextProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/register" index element={<SignUpPage />} />
        <Route path="/forgot-password" index element={<ForgotPasswordPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
