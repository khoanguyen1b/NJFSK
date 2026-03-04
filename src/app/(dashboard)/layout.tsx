"use client";

import { Sidebar } from "@/components/shared/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  useEffect(() => {
    const syncSidebarByScreen = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    syncSidebarByScreen();
    window.addEventListener("resize", syncSidebarByScreen);
    return () => {
      window.removeEventListener("resize", syncSidebarByScreen);
    };
  }, []);

  if (!accessToken) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} />
      <div
        className={cn(
          "p-6 pt-20 transition-[margin] duration-300 ease-out lg:p-8 lg:pt-8",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
