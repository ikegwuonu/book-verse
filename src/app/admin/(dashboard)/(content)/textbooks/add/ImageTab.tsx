"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { addTextbookSchemaType } from "@/lib/form-validation";
import { showerror } from "@/lib/toast";
import { CheckCircle2, ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type ImageTabProps = {
  method: UseFormReturn<addTextbookSchemaType>;
};
const ImageTab = ({ method }: ImageTabProps) => {
  const { setValue, trigger } = method;
  // Cover image
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        showerror("Please select an image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showerror("Image size should be less than 5MB");
        return;
      }

      setCoverImage(file);

      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setCoverImageUrl(imageUrl);
      setValue("cover", file);
      trigger();
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    if (coverImageUrl) {
      URL.revokeObjectURL(coverImageUrl);
    }
    setCoverImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("cover", null);
    trigger();
  };
  return (
    <TabsContent value="cover" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-2 mb-4">
            <Label className="text-gray-700">Textbook Cover Image</Label>
            <p className="text-sm text-gray-500">
              Upload a cover image for this textbook. JPG, PNG or GIF, max 5MB.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="cover-image"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center w-full justify-center py-8 border-2 border-dashed"
            >
              <Upload className="h-5 w-5 mr-2" />
              {coverImage ? "Change Cover Image" : "Upload Cover Image"}
            </Button>

            {coverImage && (
              <div className="text-sm text-gray-500 flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                {coverImage.name} (
                {(coverImage.size / (1024 * 1024)).toFixed(2)}MB)
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="space-y-2 mb-4">
            <Label className="text-gray-700">Cover Preview</Label>
            <p className="text-sm text-gray-500">
              This is how the cover will appear in the textbook listings.
            </p>
          </div>

          <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md p-6 h-[300px]">
            {coverImageUrl ? (
              <div className="relative h-full max-h-[250px] max-w-[180px] w-auto shadow-lg rounded-md overflow-hidden">
                <Image
                  src={coverImageUrl}
                  alt="Textbook cover preview"
                  className="object-cover"
                  sizes="180px"
                  width={180}
                  height={180}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="h-16 w-16 mb-2" />
                <p className="text-sm">No cover image uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ImageTab;
