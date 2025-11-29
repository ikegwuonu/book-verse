"use client";

import type React from "react";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Key, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Security from "./_components/Security";
import Notification from "./_components/Notification";
import Preference from "./_components/Preference";
import Profile from "./_components/Profile";
import Password from "./_components/Password";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-1  lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Password</span>
          </TabsTrigger>
          {/* <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger> */}
        </TabsList>

        <Profile />
        <Password />

        <Security />

        <Notification />
        <Preference />
      </Tabs>
    </div>
  );
}
