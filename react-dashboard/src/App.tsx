import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@contexts/authContext/auth-provider";
import ProtectedRouteHandler from "@components/auth/ProtectedRouteHandler";
import ExplorePage from "./pages/explorePage";
import LoginPage from "./pages/login";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRouteHandler>
                <div>Dashboard</div>
              </ProtectedRouteHandler>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRouteHandler>
                <div>Users</div>
              </ProtectedRouteHandler>
            }
          />

          <Route path="/explore" element={<ExplorePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
