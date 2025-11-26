import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayoutLogged() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
