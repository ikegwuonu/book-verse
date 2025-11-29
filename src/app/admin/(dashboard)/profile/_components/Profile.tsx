import { useUpdateAdminProfile } from "@/api/react-query/admin";
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
import {
  changePasswordSchema,
  changePasswordSchemaType,
  updateProfileAdminSchema,
  updateProfileAdminSchemaType,
} from "@/lib/form-validation";
import { roleMap } from "@/lib/utils";
import { useAdminProfileStore } from "@/zustand/adminProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { adminStore } = useAdminProfileStore();
  const { isPending, mutateAsync } = useUpdateAdminProfile();
  const form = useForm<updateProfileAdminSchemaType>({
    resolver: zodResolver(updateProfileAdminSchema),
  });
  const {
    reset,
    register,

    handleSubmit,
    watch,

    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = (data: updateProfileAdminSchemaType) => {
    reset();
  };
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = React.useState<string | null>(
    adminStore?.image || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // preview immediately
  };

  return (
    <div>
      {/* Profile Tab */}
      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src={preview || "/placeholder.svg?height=96&width=96"}
                      alt="Profile picture"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>

                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    {...register("image")}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue={adminStore?.first_name}
                        {...register("first_name")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue={adminStore?.last_name}
                        {...register("last_name")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={adminStore?.email}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="role">Role</Label>
                      <Badge
                        variant="outline"
                        className="text-navy-600 bg-navy-50"
                      >
                        {roleMap[adminStore?.role || ""]}
                      </Badge>
                    </div>
                    <Input
                      id="role"
                      value={roleMap[adminStore?.role || ""]}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  disabled
                  placeholder="Write a short bio about yourself..."
                  className="min-h-[100px]"
                  defaultValue={adminStore?.notes}
                  {...register("notes")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Profile;
