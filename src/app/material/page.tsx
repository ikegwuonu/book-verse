"use client";

import { useGetMaterial, useGetMaterialById } from "@/api/react-query/material";
import DataLoading from "@/components/DataLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { handleApiError } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const id = useSearchParams().get("id") || "";
  const { isPending, data } = useGetMaterialById(id);
  const handleError = (
    event: React.SyntheticEvent<HTMLIFrameElement, Event>
  ) => {
    handleApiError("Failed to load PDF document.");
  };
  if (isPending) {
    return <DataLoading />;
  }
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex justify-between items-center">
            <span>PDF Document Viewer</span>
          </CardTitle>
        </CardHeader>

        <iframe
          className="h-80 w-full border-0"
          id="pdfFrame"
          title="PDF"
          onError={handleError}
          loading="eager"
          src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${data?.document}`}
        ></iframe>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        <p>
          Note: Some PDF features depend on the browser's built-in PDF viewer
          capabilities.
        </p>
      </div>
    </div>
  );
}
