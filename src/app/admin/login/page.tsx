"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { AlertCircle, Eye, EyeOff, Lock, Shield, User } from "lucide-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // In a real app, this would be an actual API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, show an error
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="container max-w-md px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-navy-900 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                <p className="text-white/70 mt-1">
                  Sign in to access the dashboard
                </p>
              </div>
            </div>

            <div className="p-6">
              {error && (
                <></>
                // <Alert variant="destructive" className="mb-6">
                //   <AlertCircle className="h-4 w-4" />
                //   <AlertDescription>{error}</AlertDescription>
                // </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@bookverse.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Link
                      href="/admin/forgot-password"
                      className="text-xs text-navy-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-navy-800 hover:bg-navy-900"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  <p>This portal is restricted to authorized personnel only.</p>
                  <p className="mt-2">
                    Need access?{" "}
                    <Link
                      href="/contact"
                      className="text-navy-700 hover:underline font-medium"
                    >
                      Contact the administrator
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-navy-700"
            >
              ← Return to BookVerse Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
