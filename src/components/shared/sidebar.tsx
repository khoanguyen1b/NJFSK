"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Briefcase,
  LayoutGrid,
  FileSearch,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Home (Dashboard)", href: "/dashboard" },
  { icon: Users, label: "Users List", href: "/users" },
  { icon: Briefcase, label: "Customers List", href: "/customers" },
  { icon: LayoutGrid, label: "Notes List", href: "/notes" },
  { icon: FileSearch, label: "Text Analyze", href: "/text-analyze" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
        className={cn(
          "fixed top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 ease-out hover:bg-gray-100",
          isOpen ? "left-72" : "left-4"
        )}
      >
        {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-3 py-4">
          <div className="mb-10 px-2 py-4">
            <h1 className="text-xl font-bold text-blue-600">NJFSK Admin</h1>
          </div>
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-gray-100 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onToggle}
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
        />
      )}
    </>
  );
}
