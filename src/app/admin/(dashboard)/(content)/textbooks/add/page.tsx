"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTextbookSchema,
  addTextbookSchemaType,
} from "@/lib/form-validation";
import BasicInfoTab from "./BasicTab";
import AcademicTab from "./AcademicTab";
import ImageTab from "./ImageTab";

export default function AddTextbookPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const addTextbokForm = useForm({
    resolver: zodResolver(addTextbookSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = addTextbokForm;

  // Form submission
  const onSubmit = (data: addTextbookSchemaType) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto">
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
            className="w-full"
          >
            <div className="border-b border-gray-200">
              <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 rounded-none">
                <TabsTrigger
                  value="basic"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Academic Details
                </TabsTrigger>

                <TabsTrigger
                  value="cover"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
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
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/textbooks">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-navy-800 hover:bg-navy-900"
            disabled={isLoading}
          >
            {isLoading ? "Adding Textbook..." : "Add Textbook"}
          </Button>
        </div>
      </form>
    </div>
  );
}
