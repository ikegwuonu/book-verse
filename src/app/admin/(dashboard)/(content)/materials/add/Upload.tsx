import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { addMaterialSchemaType } from "@/lib/form-validation";
import { showerror } from "@/lib/toast";
import { CheckCircle2, ImageIcon, Trash2, UploadIcon } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function Upload({
  method,
}: {
  method: UseFormReturn<addMaterialSchemaType>;
}) {
  // Document state
  const [docFile, setDocFile] = useState<File | null>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    setValue,
  } = method;
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      showerror("Please upload a .pdf, .doc or .docx file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showerror("Document size must be under 10MB.");
      return;
    }

    setDocFile(file);
    setValue("document", file);
  };

  const removeDoc = () => {
    setDocFile(null);
    if (docInputRef.current) docInputRef.current.value = "";
    setValue("document", null);
  };
  return (
    <TabsContent value="upload" className="p-6">
      <div className="mt-8">
        <Label className="text-gray-700">
          Material File (.pdf, .doc, .docx)
        </Label>
        <p className="text-sm text-gray-500 mb-2">
          Upload the actual material file (max 10MB).
        </p>

        <input
          type="file"
          ref={docInputRef}
          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleDocChange}
          className="hidden"
          id="doc-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => docInputRef.current?.click()}
          className="flex items-center w-full justify-center py-8 border-2 border-dashed"
        >
          <UploadIcon className="h-5 w-5 mr-2" />
          {docFile ? "Change Document" : "Upload Document"}
        </Button>

        {docFile && (
          <div className="text-sm text-gray-500 flex items-center mt-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
            {docFile.name} ({(docFile.size / (1024 * 1024)).toFixed(2)}MB)
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeDoc}
              className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove document</span>
            </Button>
          </div>
        )}
      </div>
    </TabsContent>
  );
}
