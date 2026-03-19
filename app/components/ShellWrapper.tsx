"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "./DashboardShell";

export function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where we DON'T want the Sidebar or Navbar
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
