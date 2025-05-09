"use client";

import type React from "react";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPwdSchema, resetPwdSchemaType } from "@/lib/form-validation";
import { handleApiError } from "@/lib/utils";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase-init";
import { actionCodeSettings } from "@/lib/firebase-auth";
import { showinfo } from "@/lib/toast";

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(resetPwdSchema),
  });
  const onSubmit = async (data: resetPwdSchemaType) => {
    startTransition(async () => {
      try {
        await sendPasswordResetEmail(
          auth,
          data.email,
          actionCodeSettings(data.email, "resetPwd")
        );
        setIsSuccess(true);
      } catch (err) {
        handleApiError(err);
      }
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
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="text-white/70 mt-1">Admin Portal</p>
          </div>
        </div>

        <div className="p-6">
          {!isSuccess ? (
            <>
              <p className="text-gray-600 mb-6">
                Enter your email address below and we'll send you a link to
                reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@bookverse.com"
                      className="pl-10"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-navy-800 hover:bg-navy-900"
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Check your email
              </h3>
              <p className="mt-2 text-gray-600">
                We've sent a password reset link to{" "}
                <strong>{watch("email")}</strong>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                If you don't see it, please check your spam folder.
              </p>
              <Button
                className="mt-6 bg-navy-800 hover:bg-navy-900"
                onClick={() => setIsSuccess(false)}
              >
                Back to Reset Form
              </Button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <Link
                href="/admin/login"
                className="inline-flex items-center text-sm text-navy-700 hover:text-navy-800 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
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
