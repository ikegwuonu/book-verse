"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  Home,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [contentExpanded, setContentExpanded] = useState(true);
  const [usersExpanded, setUsersExpanded] = useState(true);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-12 w-12 rounded-full bg-navy-800 hover:bg-navy-900 shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 pt-16 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-md bg-navy-800 flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy-900">BookVerse Admin</p>
                <p className="text-xs text-gray-500">
                  Manage your digital library
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                href="/admin/dashboard"
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/admin/dashboard"
                    ? "bg-navy-50 text-navy-900"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              {/* Content Management Section */}
              <div>
                <button
                  onClick={() => setContentExpanded(!contentExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <Library className="h-4 w-4" />
                    <span>Content</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      contentExpanded ? "rotate-180" : ""
                    )}
                  />
                </button>

                {contentExpanded && (
                  <div className="pl-9 space-y-1 mt-1">
                    <Link
                      href="/admin/books"
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/books" ||
                          pathname.startsWith("/admin/books/")
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Books</span>
                    </Link>
                    <Link
                      href="/admin/categories"
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/categories" ||
                          pathname.startsWith("/admin/categories/")
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <Tag className="h-4 w-4" />
                      <span>Categories</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* User Management Section */}
              <div>
                <button
                  onClick={() => setUsersExpanded(!usersExpanded)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium",
                    pathname.startsWith("/admin/users")
                      ? "bg-navy-50 text-navy-900"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      usersExpanded ? "rotate-180" : ""
                    )}
                  />
                </button>

                {usersExpanded && (
                  <div className="pl-9 space-y-1 mt-1">
                    <Link
                      href="/admin/users"
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/users"
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <span>All Users</span>
                    </Link>
                    <Link
                      href="/admin/users/add"
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/users/add"
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <span>Add Admin</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/admin/analytics"
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/admin/analytics"
                    ? "bg-navy-50 text-navy-900"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>

              <Link
                href="/admin/settings"
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/admin/settings"
                    ? "bg-navy-50 text-navy-900"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-gray-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
