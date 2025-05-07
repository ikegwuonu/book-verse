"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Book, X } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Basic from "./Basic";
import Additional from "./Additional";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMaterialSchema,
  addMaterialSchemaType,
} from "@/lib/form-validation";
import Upload from "./Upload";
import { useAddMaterial } from "@/api/react-query/material";
import { useAdminProfileStore } from "@/zustand/adminProfile";

const tabValue = ["basic", "additional", "upload"];
const tabFields: Record<
  (typeof tabValue)[number],
  Path<addMaterialSchemaType>[]
> = {
  basic: [
    "topic",
    "lecturer",
    "format",
    "course_code",
    "status",
    "level",
    "course_title",
  ], // example fields from BasicTab
  additional: ["faculty", "department", "keywords", "description"], // example fields from AcademicTab
  upload: ["document"], // example from ImageTab
};

export default function AddBookPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const { mutateAsync: addMaterialFn, isPending } = useAddMaterial();
  const { email } = useAdminProfileStore().adminStore;
  const method = useForm<addMaterialSchemaType>({
    resolver: zodResolver(addMaterialSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = method;

  // Form submission
  const onSubmit = async (data: addMaterialSchemaType) => {
    await addMaterialFn({ ...data, added_by: email });
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto mb-20">
      <div className="mb-6">
        <Link
          href="/admin/books"
          className="text-navy-700 hover:text-navy-900 flex items-center text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Materials
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <Book className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              Add New Material
            </h1>
            <p className="text-gray-600">
              Add a new material to your digital library
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
                  value="additional"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Additional Details
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Upload Doc
                </TabsTrigger>
              </TabsList>
            </div>

            <Basic method={method} />
            <Additional method={method} />
            <Upload method={method} />
          </Tabs>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/books">Cancel</Link>
          </Button>
          <Button
            type={activeTab === "upload" ? "submit" : "button"}
            className="bg-navy-800 hover:bg-navy-900"
            disabled={isPending}
            onClick={async () => {
              if (activeTab === "upload") return; // Submit handled by form

              const isStepValid = await method.trigger(tabFields[activeTab]);
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
              : activeTab === "upload"
                ? "Add Textbook"
                : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
