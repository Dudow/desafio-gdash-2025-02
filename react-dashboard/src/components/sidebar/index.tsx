// src/components/Sidebar.tsx
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@components/ui/separator";
import { cn } from "@/lib/utils";

import { LayoutDashboard, Users, LogOut, BrainCircuit } from "lucide-react";

export function Sidebar() {
  const { pathname } = useLocation();

  const linkClasses = (path: string) =>
    cn(
      "w-full justify-start gap-3",
      pathname === path
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    );

  return (
    <aside className="h-full min-h-screen w-64 border-r flex flex-col bg-background justify-between">
      <div className="flex flex-col">
        <div className="p-6 pb-4 text-2xl font-bold flex items-center gap-3">
          <BrainCircuit className="w-8 h-8" />
          GDASHOW
        </div>
        <Separator className="my-5" />
        <div className="flex flex-col gap-2 px-3">
          <NavLink to="/">
            <Button variant="ghost" className={linkClasses("/")}>
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Button>
          </NavLink>

          <NavLink to="/users">
            <Button variant="ghost" className={linkClasses("/users")}>
              <Users className="w-5 h-5" />
              Users
            </Button>
          </NavLink>
        </div>
      </div>
      <div>
        <Separator className="mb-3" />
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
