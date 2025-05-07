import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { pharmacyCourses } from "@/constants/pharmCourses";
import { addMaterialSchemaType } from "@/lib/form-validation";
import { Plus, X } from "lucide-react";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

// Sample genres for selection
const courseInfo = [{ title: "Sterilization", code: "PMB4I5", level: "400" }];
export default function Basic({
  method,
}: {
  method: UseFormReturn<addMaterialSchemaType>;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = method;
  return (
    <TabsContent value="basic" className="p-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-gray-700">
          Topic<span className="text-red-500">*</span>
        </Label>
        <Input
          id="topic"
          {...register("topic")}
          placeholder="Enter material topic"
          required
          error={errors.topic?.message}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700">
          Lecturer(s) <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-3">
          <Input
            {...register("lecturer")}
            placeholder={`Lecturer `}
            error={errors.lecturer?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre" className="text-gray-700">
          Course Code <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="course_code"
          control={method.control}
          render={({ field }) => (
            <Select
              onValueChange={(selectedCode) => {
                const selectedCourse = pharmacyCourses.find(
                  (c) => c.courseCode === selectedCode
                );
                field.onChange(selectedCode); // set course_code
                if (selectedCourse) {
                  setValue("course_title", selectedCourse.courseTitle);
                  setValue("level", selectedCourse.level);
                  setValue("semester", selectedCourse.semester);
                }
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent
                className="w-fit !text-sm"
                error={
                  errors.course_code?.message ||
                  errors.course_title?.message ||
                  errors.level?.message
                }
              >
                {pharmacyCourses.map((course, i) => (
                  <SelectItem
                    className="!text-sm"
                    key={`${i}`}
                    value={course.courseCode}
                  >
                    {course.courseCode} - {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="Year" className="text-gray-700">
            Year <span className="text-red-500">*</span>
          </Label>
          <Input
            id="Year"
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            {...register("year")}
            placeholder="YYYY"
            error={errors.year?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700">Format</Label>
        <Controller
          name="format"
          control={method.control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
              }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="font-normal cursor-pointer">
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doc" id="doc" />
                <Label htmlFor="doc" className="font-normal cursor-pointer">
                  Msdoc
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image" className="font-normal cursor-pointer">
                  Image
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Audiobook" id="audiobook" />
                <Label
                  htmlFor="audiobook"
                  className="font-normal cursor-pointer"
                >
                  Audiobook
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hand" id="hand" />
                <Label htmlFor="hand" className="font-normal cursor-pointer">
                  Hand written
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

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
                <RadioGroupItem value="review" id="review" />
                <Label htmlFor="review" className="font-normal cursor-pointer">
                  Review
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft" className="font-normal cursor-pointer">
                  Draft
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>
    </TabsContent>
  );
}
