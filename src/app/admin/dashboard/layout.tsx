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

export default function AddAdminPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [sendInvite, setSendInvite] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!firstName || !lastName || !email || !role) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // In a real app, this would be an actual API call to create the admin
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, show success
      setSuccess(true);
      setIsLoading(false);

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setNotes("");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const selectedRole = roles.find((r) => r.id === role);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-16 flex">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/admin/users"
                className="text-navy-700 hover:text-navy-900 flex items-center text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Admin Users
              </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-navy-900">
                  Add New Admin
                </h1>
                <p className="text-gray-600">
                  Create a new administrator account with specific role
                  permissions
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-navy-800" />
              </div>
            </div>

            {/* Alert Messages
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Admin user created successfully!{" "}
                  {sendInvite && "An invitation email has been sent."}
                </AlertDescription>
              </Alert>
            )} */}

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      This email will be used for login and receiving
                      notifications
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-700">
                      Admin Role <span className="text-red-500">*</span>
                    </Label>

                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedRole && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start mb-3">
                          <Shield className="h-5 w-5 text-navy-700 mt-0.5 mr-2" />
                          <div>
                            <h3 className="font-medium text-navy-900">
                              {selectedRole.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {selectedRole.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-7">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Permissions:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            {selectedRole.permissions.map(
                              (permission, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-gray-600 flex items-center"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mr-2" />
                                  {permission}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-700">
                      Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional information about this admin user..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="send-invite"
                      checked={sendInvite}
                      onCheckedChange={(checked) =>
                        setSendInvite(checked === true)
                      }
                    />
                    <Label
                      htmlFor="send-invite"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                    >
                      Send invitation email with setup instructions
                    </Label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/admin/users">Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      className="bg-navy-800 hover:bg-navy-900"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create Admin User"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
