"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { cn, getInitials, roleMap } from "@/lib/utils";
import { adminRoutes, routes } from "@/lib/routes";
import useScreenSize from "@/hooks/use-screen-size";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { useAdminProfileStore } from "@/zustand/adminProfile";
import { useAdminFirebaseStore } from "@/zustand/adminFirebase";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [contentExpanded, setContentExpanded] = useState(true);
  const [usersExpanded, setUsersExpanded] = useState(true);
  const { logOutAdminStore, adminStore } = useAdminProfileStore();
  const { first_name = "", last_name = "", role = "" } = adminStore || {};
  const { logOutAdminFirebaseStore: logOutFB, adminFirebaseStore } =
    useAdminFirebaseStore();

  const { width } = useScreenSize();
  const isMobile = width < 768;

  const logout = async () => {
    await signOut(auth);
    logOutAdminStore();
    logOutFB();
    router.replace(routes.login);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-4 right-4 z-10 md:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-12 w-12 rounded-full bg-navy-800 hover:bg-navy-900 shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "sticky h-[calc(100vh-64px)]    bottom-0 top-16 left-0 z-20 w-64 min-w-56 bg-white border-r border-gray-200 pt-2 transition-transform duration-300 ease-in-out md:translate-x-0  md:z-0",
          isOpen && isMobile ? " !block fixed !z-10 " : "md:block hidden z-20 "
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 ">
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

            <nav className="space-y-1 ">
              <Link
                href="/admin/profile"
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/admin/profile"
                    ? "bg-navy-50 text-navy-900"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Home className="h-4 w-4" />
                <span>Profile</span>
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
                      href={adminRoutes.materials}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/materials" ||
                          pathname.startsWith("/admin/materials/")
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Materials</span>
                    </Link>
                    <Link
                      href={adminRoutes.textbooks}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/text-books" ||
                          pathname.startsWith("/admin/text-books/")
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <Tag className="h-4 w-4" />
                      <span>Textbooks</span>
                    </Link>
                  </div>
                )}
              </div>
              {adminStore?.role === "user-manager" ? (
                <>
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
                        <span>Team</span>
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
                        {/* <Link
                      href="/admin/users"
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                        pathname === "/admin/users"
                          ? "text-navy-900 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <span> Users</span>
                    </Link> */}
                        <Link
                          href={adminRoutes.admin}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
                            pathname === "/admin/users/add"
                              ? "text-navy-900 font-medium"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                        >
                          <span> Admin</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href={adminRoutes.analytics}
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
                    href={adminRoutes.settings}
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
                </>
              ) : null}
            </nav>
          </div>

          <div className="mt-auto  p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {getInitials(first_name, last_name)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {first_name + " " + last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {roleMap[role]}
                </p>
              </div>
            </div>
            <Button
              onClick={logout}
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
