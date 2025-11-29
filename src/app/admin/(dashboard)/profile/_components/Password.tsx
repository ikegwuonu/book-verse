import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Check, Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAdminSchema,
  addAdminSchemaType,
  changePasswordSchema,
  changePasswordSchemaType,
} from "@/lib/form-validation";
import { useUpdatePassword } from "@/api/react-query/auth";

const Password = () => {
  const { isPending, mutateAsync: updatedData } = useUpdatePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });
  const {
    reset,
    register,
    control,
    handleSubmit,
    watch,

    formState: { errors, isSubmitting },
  } = form;
  // Mock function to check password strength
  const checkPasswordStrength = (password: string) => {
    // Simple password strength checker
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };
  const passwordStrength = watch("newPassword")
    ? checkPasswordStrength(watch("newPassword"))
    : 0;
  const onSubmit = (data: changePasswordSchemaType) => {
    updatedData(data);
    reset();
  };
  return (
    <div>
      {/* Password Tab */}
      <TabsContent value="password" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    {...register("currentPassword")}
                    error={errors.currentPassword?.message}
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("newPassword")}
                    error={errors.newPassword?.message}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Password strength indicator */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      Password strength
                    </span>
                    <span className="text-xs font-medium">
                      {passwordStrength === 0 && "Very weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Medium"}
                      {passwordStrength === 3 && "Strong"}
                      {passwordStrength === 4 && "Very strong"}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        passwordStrength === 0 && "w-0",
                        passwordStrength === 1 && "w-1/4 bg-red-500",
                        passwordStrength === 2 && "w-2/4 bg-yellow-500",
                        passwordStrength === 3 && "w-3/4 bg-blue-500",
                        passwordStrength === 4 && "w-full bg-green-500"
                      )}
                    />
                  </div>
                </div>

                <ul className="mt-2 space-y-1 text-xs text-gray-500">
                  <li className="flex items-center gap-1">
                    <span
                      className={
                        passwordStrength >= 1
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {passwordStrength >= 1 ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </span>
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-1">
                    <span
                      className={
                        /[A-Z]/.test("") ? "text-green-500" : "text-gray-400"
                      }
                    >
                      {/[A-Z]/.test("") ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </span>
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center gap-1">
                    <span
                      className={
                        /[0-9]/.test("") ? "text-green-500" : "text-gray-400"
                      }
                    >
                      {/[0-9]/.test("") ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </span>
                    At least one number
                  </li>
                  <li className="flex items-center gap-1">
                    <span
                      className={
                        /[^A-Za-z0-9]/.test("")
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {/[^A-Za-z0-9]/.test("") ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </span>
                    At least one special character
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Password;
