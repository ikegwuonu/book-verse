"use client";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ImageIcon,
  Shield,
  Trash2,
  Upload,
  UserPlus,
} from "lucide-react";
import { addAdminSchema, addAdminSchemaType } from "@/lib/form-validation";
import { roles } from "@/lib/constant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUp } from "@/lib/auth";
import { auth, db, doc, getDoc, setDoc } from "@/lib/firebase";
import { showerror, showsuccess } from "@/lib/toast";
import { uploadFile } from "@/lib/action";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AddAdminPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<addAdminSchemaType>({
    resolver: zodResolver(addAdminSchema),
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const watchRole = watch("role");
  const selectedRole = roles.find((r) => r.id === watchRole);
  console.log(errors);
  const onSubmit = async (data: addAdminSchemaType) => {
    console.log("Form data:", data);
    startTransition(async () => {
      try {
        const emailRef = doc(db, "admin", data.email);
        const emailDoc = await getDoc(emailRef);

        if (emailDoc.exists()) {
          return showerror("Email already exists!");
        }

        createUserWithEmailAndPassword(auth, data.email, data.last_name);
        const uploadData = await uploadFile(data.image);
        if (!uploadData || !uploadData.url) return;
        await setDoc(emailRef, {
          ...data,
          image: uploadData.url,
          created_at: new Date(),
        });

        showsuccess("Admin created successfully!");
      } catch (err: any) {
        console.error(err);
        showerror(err.message || "Operation failed");
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-5xl mx-auto">
      <div className="p-6">
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
            <h1 className="text-2xl font-bold text-navy-900">Add New Admin</h1>
            <p className="text-gray-600">
              Create a new administrator account with specific role permissions
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-navy-800" />
          </div>
        </div>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FileUpload name="image" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="first-name">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="first-name"
                  {...register("first_name")}
                  error={errors.first_name?.message}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="last-name">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="last-name"
                  {...register("last_name")}
                  error={errors.last_name?.message}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <p className="text-sm text-muted-foreground">
                This email will be used for login and notifications
              </p>
            </div>

            {/* Role Selector */}
            <div className="space-y-3">
              <Label>
                Admin Role <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role?.message && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}

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
                      {selectedRole.permissions.map((permission, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mr-2" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                className="min-h-[100px]"
                placeholder="Additional information..."
              />
            </div>

            {/* Send Invite Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="send-invite" />
              <Label htmlFor="send-invite" className="text-sm font-medium">
                Send invitation email with setup instructions
              </Label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" asChild>
                <Link href="/admin/users">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending || isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isPending || isSubmitting ? "Processing..." : "Create Admin"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
