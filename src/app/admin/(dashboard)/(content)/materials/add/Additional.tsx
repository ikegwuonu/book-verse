import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { department, faculties } from "@/lib/constant";
import { addMaterialSchemaType } from "@/lib/form-validation";
import { Info } from "lucide-react";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export default function Additional({
  method,
}: {
  method: UseFormReturn<addMaterialSchemaType>;
}) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = method;
  return (
    <TabsContent value="additional" className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="department" className="text-gray-700">
            Department <span className="text-red-500">*</span>
          </Label>
          <Select
            value={watch("department")}
            {...register("department")}
            onValueChange={(val) => {
              const cover = department.find((d) => d.val === val);
              if (cover) {
                setValue("department", val);
                setValue("cover", cover.url);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent error={errors.department?.message}>
              {department.map((level) => (
                <SelectItem key={level.val} value={level.val}>
                  {level.val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* faculty */}
        <div className="space-y-2">
          <Label htmlFor="faculty" className="text-gray-700">
            Faculty <span className="text-red-500">*</span>
          </Label>
          <Select
            value={watch("faculty")}
            {...register("faculty")}
            onValueChange={(val) => {
              setValue("faculty", val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select faculty" />
            </SelectTrigger>
            <SelectContent error={errors.faculty?.message}>
              {faculties.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords" className="text-gray-700">
          Keywords
        </Label>
        <Controller
          name="keywords" // must match your Zod schema
          control={method.control}
          render={({ field }) => (
            <MultiSelect
              options={[
                { label: "Science", value: "science" },
                { label: "Pharmacy", value: "pharmacy" },
                { label: "Pharmacology", value: "pharmacology" },
                { label: "Pharmacognosy", value: "pharmacognosy" },
                { label: "Pharmaceutices", value: "pharmaceutics" },
                { label: "Clinical Pharmacy", value: "pcn" },
              ]}
              selected={field.value?.split(" ") || []}
              onChange={(selectedArray) => {
                const stringValue = selectedArray.join(" "); // Or use "," if that's preferred
                field.onChange(stringValue);
              }}
              //selected={[]}
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter book description or synopsis"
          className="min-h-[150px]"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Additional Information</p>
            <p className="mt-1">
              These details help with categorization, discovery, and promotion
              of books in your digital library. The more information you
              provide, the easier it will be for users to find this book.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
