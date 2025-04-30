"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { AlertCircle, Eye, EyeOff, Lock, Shield, User } from "lucide-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/form-validation";
import { sign } from "crypto";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { showerror } from "@/lib/toast";
import { handleApiError } from "@/lib/utils";
import { signUp } from "@/lib/action";

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: loginSchemaType) => {
    startTransition(async () => {
      await signUp(auth, data);
    });
  };

  return (
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  placeholder="admin@bookverse.com"
                  className="pl-10"
                  {...register("email")}
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
                  {...register("password")}
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
              <Checkbox id="remember" />
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
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
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
        <Link href="/" className="text-sm text-gray-600 hover:text-navy-700">
          ← Return to BookVerse Home
        </Link>
      </div>
    </div>
  );
}
