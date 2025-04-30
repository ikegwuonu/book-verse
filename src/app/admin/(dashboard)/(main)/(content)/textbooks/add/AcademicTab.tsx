"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { addTextbookSchemaType } from "@/lib/form-validation";
import { X } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

// Sample academic levels
const academicLevels = ["100 ", "200", "300", "400", "500", "600", "All"];
const department = [
  "Pharmacology",
  "Pharmacognsy",
  "Pharmaaceutical Microbiology",
  "Pharmaceutical Chemistry",
  "Pharmaceutics",
  "Clinical Pharmacy",
];
const faculties = ["Pharmacy"];
type AcademicInfoProps = {
  method: UseFormReturn<addTextbookSchemaType>;
};
const AcademicTab = ({ method }: AcademicInfoProps) => {
  const [academicLevel, setAcademicLevel] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const {
    register,
    setValue,
    clearErrors,
    watch,
    trigger,
    formState: { errors },
  } = method;

  // Handle keywords
  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
      // setValue("keywords", [...keywords].join(" "));
      trigger();
    }
    setValue("keywords", [...keywords, currentKeyword].join(" "));
    console.log(watch("keywords"));
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
    setValue("keywords", keywords.join(" "));
    trigger();
  };
  return (
    <TabsContent value="academic" className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Level */}
        <div className="space-y-2">
          <Label htmlFor="academicLevel" className="text-gray-700">
            Academic Level <span className="text-red-500">*</span>
          </Label>
          <Select
            value={watch("academic_level")}
            {...register("academic_level")}
            onValueChange={(val) => {
              setValue("academic_level", val);
              trigger();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select academic level" />
            </SelectTrigger>
            <SelectContent error={errors.academic_level?.message}>
              {academicLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department" className="text-gray-700">
            Department <span className="text-red-500">*</span>
          </Label>
          <Select
            value={watch("department")}
            {...register("department")}
            onValueChange={(val) => {
              setValue("department", val);
              trigger();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent error={errors.department?.message}>
              {department.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="faculty" className="text-gray-700">
          Faculty <span className="text-red-500">*</span>
        </Label>
        <Select
          {...register("faculty")}
          onValueChange={(val) => {
            setValue("faculty", val);
            trigger();
          }}
          value={watch("faculty")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Faculty" />
          </SelectTrigger>
          <SelectContent error={errors.faculty?.message}>
            {faculties.map((faculty) => (
              <SelectItem key={faculty} value={faculty}>
                {faculty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500">
          Enter the faculty this textbook is typically used in
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="keywords" className="text-gray-700">
          Keywords
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="keywords"
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
            placeholder="Add keywords to help with search and categorization"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addKeyword();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addKeyword}
            className="flex-shrink-0"
            disabled={!currentKeyword.trim()}
          >
            Add
          </Button>
        </div>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {keyword}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </TabsContent>
  );
};

export default AcademicTab;
