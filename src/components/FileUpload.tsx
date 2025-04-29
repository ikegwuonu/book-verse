// FileUpload.tsx
"use client";
import { useFormContext, FieldName, FieldPath } from "react-hook-form";
import { CheckCircle2, ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const FileUpload = ({ name }: { name: string }) => {
  const {
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageFile = watch(name);
  const previewUrl = watch(`${name}Preview`);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setValue(name, file);
    clearErrors(name);
    setValue(`${name}Preview`, URL.createObjectURL(file));
  };

  const removeImage = () => {
    setValue(name, undefined);
    setError(name, {
      type: "manual",
      message: "Image is required",
    }),
      setValue(`${name}Preview`, undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-100">
      <div className="relative">
        <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-300" />
            </div>
          )}
        </div>
        {previewUrl && (
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <Label className="text-gray-700 mb-2 block">Profile Picture</Label>
          <p className="text-sm text-gray-500 mb-3">
            Upload a profile picture for this admin user. JPG, PNG or GIF, max
            5MB.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-image"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            {imageFile ? "Change Image" : "Upload Image"}
          </Button>

          {imageFile && (
            <div className="text-sm text-gray-500 flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
              {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)}MB)
            </div>
          )}
        </div>
        {errors[name]?.message && (
          <p className="text-red-500 text-sm">
            {typeof errors[name]?.message === "string"
              ? errors[name]?.message
              : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
