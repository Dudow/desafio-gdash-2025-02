import { Outlet } from "react-router-dom";

export function AppLayoutDefault() {
  return (
    <main className="w-full h-screen">
      <Outlet />
    </main>
  );
}
