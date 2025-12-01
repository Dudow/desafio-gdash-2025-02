import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayoutLogged() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
