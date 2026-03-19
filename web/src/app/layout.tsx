import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ThemeInitializer from "@/components/ThemeInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Approval System - Admin Dashboard",
  description: "Modern Admin Panel with Go gRPC Backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-gray-900`}>
        <ThemeInitializer />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-64 min-h-screen">
            <Header />
            <main className="pt-24 px-10 pb-12">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
