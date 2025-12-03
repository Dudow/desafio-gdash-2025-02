import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@contexts/authContext/auth-provider";
import ProtectedRouteHandler from "@components/auth/ProtectedRouteHandler";
import ExplorePage from "@pages/explorePage";
import LoginPage from "@pages/login";
import { Toaster } from "@components/ui/sonner";
import { AppLayoutLogged } from "@/layouts/layoutLogged";
import { AppLayoutDefault } from "@/layouts/layoutDefault";
import Users from "./pages/users";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route element={<AppLayoutDefault />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRouteHandler>
                <AppLayoutLogged />
              </ProtectedRouteHandler>
            }
          >
            <Route
              path="/users"
              element={
                <div>
                  <Users />
                </div>
              }
            />

            <Route
              path="/"
              element={
                <div>
                  <Dashboard />
                </div>
              }
            />

            <Route
              path="/explore"
              element={
                <div>
                  <ExplorePage />
                </div>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
