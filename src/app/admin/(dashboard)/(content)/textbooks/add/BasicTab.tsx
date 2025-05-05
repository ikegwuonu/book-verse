"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import { addTextbookSchemaType } from "@/lib/form-validation";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";

type BasicInfoProps = {
  method: UseFormReturn<addTextbookSchemaType>;
};

const BasicInfoTab = ({ method }: BasicInfoProps) => {
  const [authors, setAuthors] = useState<string[]>([""]);
  const {
    register,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = method;
  // const authors=watch("author").split("")||[]
  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors); // <-- this was missing
    setValue("author", newAuthors.join(" ")); // keep this to sync form value
    trigger("author");
  };

  const addAuthorField = () => {
    setAuthors([...authors, ""]);
    setValue("author", authors.join(" "));
    trigger();
  };

  const removeAuthorField = (index: number) => {
    if (authors.length > 1) {
      const newAuthors = [...authors];
      newAuthors.splice(index, 1);
      setAuthors(newAuthors);
    }
    setValue("author", authors.join(" "));
    trigger();
  };
  return (
    <TabsContent value="basic" className="p-6 space-y-6">
      <FormProvider {...method}>
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-700">
            Textbook Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            error={errors.title?.message}
            {...register("title")}
            placeholder="Enter textbook title"
          />
        </div>

        {/* Authors */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            Author(s) <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-3">
            {authors.map((author, index) => (
              <div key={index} className={cn("flex items-center gap-2")}>
                <Input
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  placeholder={`Author ${index + 1}`}
                />
                {authors.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAuthorField(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove author</span>
                  </Button>
                )}
              </div>
            ))}
            {errors.author?.message && (
              <p className="text-xs text-red-400">{errors.author.message}</p>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAuthorField}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Author
            </Button>
          </div>
        </div>

        {/* Edition */}
        <div className="space-y-2">
          <Label htmlFor="edition" className="text-gray-700">
            Edition
          </Label>
          <Input
            id="edition"
            error={errors.edition?.message}
            {...register("edition")}
            placeholder="e.g., 3rd Edition"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn" className="text-gray-700">
            ISBN
          </Label>
          <Input
            id="isbn"
            error={errors.isbn?.message}
            {...register("isbn")}
            placeholder="e.g., 77787878"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-gray-700">Status</Label>
          <Controller
            name="status"
            control={method.control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  trigger("status");
                }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="published" id="published" />
                  <Label
                    htmlFor="published"
                    className="font-normal cursor-pointer"
                  >
                    Published
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft" className="font-normal cursor-pointer">
                    Draft
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="review" id="review" />
                  <Label
                    htmlFor="review"
                    className="font-normal cursor-pointer"
                  >
                    Under Review
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </FormProvider>
    </TabsContent>
  );
};

export default BasicInfoTab;
