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
import { Textarea } from "@/components/ui/textarea";
import { roles } from "@/lib/constant";
import { addAdminSchema, addAdminSchemaType } from "@/lib/form-validation";
import { IGetAdmin } from "@/lib/types";
import { roleMap } from "@/lib/utils";
import { useModal } from "@/zustand/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  title?: string;
  description?: string;
  admin: IGetAdmin;
};
const EditAdminModal = ({ admin }: Props) => {
  const { mutateAsync: updateAdminFn, isPending } = useUpdateAdminProfile();

  const form = useForm<addAdminSchemaType>({
    resolver: zodResolver(addAdminSchema),
  });
  const {
    reset,
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const watchRole = watch("role");
  const selectedRole = roles.find((r) => r.id === watchRole);

  const onSubmit = async (data: addAdminSchemaType) => {
    await updateAdminFn({
      data,
      uid: "",
    });
    reset();
  };
  const { closeModal } = useModal();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = React.useState<string | null>(
    admin?.image || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // preview immediately
  };

  return (
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
                  src={admin.image || "/placeholder.svg?height=96&width=96"}
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
                    defaultValue={admin?.first_name}
                    {...register("first_name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={admin?.last_name}
                    {...register("last_name")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={admin?.email}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="role">Role</Label>
                  <Badge variant="outline" className="text-navy-600 bg-navy-50">
                    {roleMap[admin?.role || ""]}
                  </Badge>
                </div>
                <Input
                  id="role"
                  value={roleMap[admin?.role || ""]}
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
              defaultValue={admin?.notes}
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
  );
};

export default EditAdminModal;
