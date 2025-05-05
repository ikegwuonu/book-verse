"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { FieldArrayPath, Path, PathString, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTextbookSchema,
  addTextbookSchemaType,
} from "@/lib/form-validation";
import BasicInfoTab from "./BasicTab";
import AcademicTab from "./AcademicTab";
import ImageTab from "./ImageTab";
import { useAddTextbook } from "@/api/react-query/textbook";
import { useAdminProfileStore } from "@/zustand/adminProfile";
import { showsuccess } from "@/lib/toast";

const tabValue = ["basic", "academic", "cover"];
const tabFields: Record<
  (typeof tabValue)[number],
  Path<addTextbookSchemaType>[]
> = {
  basic: ["title", "author", "edition", "isbn", "status"], // example fields from BasicTab
  academic: ["faculty", "department", "academic_level", "keywords"], // example fields from AcademicTab
  cover: ["cover"], // example from ImageTab
};

export default function AddTextbookPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabValue)[number]>("basic");
  const { isPending, mutate: addTextbokFn } = useAddTextbook();
  const { email } = useAdminProfileStore().adminStore;
  const addTextbokForm = useForm({
    resolver: zodResolver(addTextbookSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = addTextbokForm;
  console.log(errors);
  // Form submission
  const onSubmit = (data: addTextbookSchemaType) => {
    const updatedData = { ...data, added_by: email };
    console.log(updatedData);
    addTextbokFn(updatedData);
  };

  return (
    <div className="max-w-5xl mx-auto mb-20">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/textbooks"
          className="text-navy-700 hover:text-navy-900 flex items-center text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Textbooks
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <BookOpen className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              Add New Textbook
            </h1>
            <p className="text-gray-600">
              Add a new textbook to your digital library
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full "
          >
            <div className="border-b border-gray-200 overflow-auto">
              <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 rounded-none ">
                <TabsTrigger
                  value="basic"
                  className="md:px-6 px-3   py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="md:px-6 px-3   py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Academic Details
                </TabsTrigger>

                <TabsTrigger
                  value="cover"
                  className="md:px-6 px-3   py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Cover Image
                </TabsTrigger>
              </TabsList>
            </div>

            <BasicInfoTab method={addTextbokForm} />
            <AcademicTab method={addTextbokForm} />
            <ImageTab method={addTextbokForm} />
          </Tabs>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type={activeTab === "cover" ? "submit" : "button"}
            className="bg-navy-800 hover:bg-navy-900"
            disabled={isPending}
            onClick={async () => {
              if (activeTab === "cover") return; // Submit handled by form

              const isStepValid = await addTextbokForm.trigger(
                tabFields[activeTab]
              );
              if (!isStepValid) return;

              const currentIndex = tabValue.indexOf(activeTab);
              const nextTab = tabValue[currentIndex + 1];
              if (nextTab) {
                setActiveTab(nextTab);
              }
            }}
          >
            {isPending
              ? "Adding Textbook..."
              : activeTab === "cover"
                ? "Add Textbook"
                : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
