"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Shield,
  UserPlus,
} from "lucide-react";

import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Footer } from "@/components/Footer";

// Define admin role types and permissions
const roles = [
  {
    id: "super-admin",
    name: "Super Admin",
    description: "Full access to all system features and settings",
    permissions: [
      "Manage admins",
      "Manage users",
      "Manage content",
      "View analytics",
      "System settings",
    ],
  },
  {
    id: "content-manager",
    name: "Content Manager",
    description: "Manage books, categories, and content",
    permissions: [
      "Add/edit books",
      "Manage categories",
      "Moderate reviews",
      "Manage featured content",
    ],
  },
  {
    id: "user-manager",
    name: "User Manager",
    description: "Manage user accounts and subscriptions",
    permissions: [
      "View user accounts",
      "Edit user details",
      "Manage subscriptions",
      "Handle user support",
    ],
  },
  {
    id: "analytics-viewer",
    name: "Analytics Viewer",
    description: "View reports and analytics only",
    permissions: [
      "View reading statistics",
      "View user growth",
      "View content performance",
      "Export reports",
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-16 flex relative">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className=" ">
            {/* Breadcrumb */}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
