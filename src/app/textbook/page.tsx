"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useMemo } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import usePdfControl from "@/hooks/use-pdf-control";
import { useParams, useSearchParams } from "next/navigation";
import { handleApiError } from "@/lib/utils";
import { Url } from "url";
import PDFControl from "./PDF-Control";
import { Loader } from "@/providers/app-loader";

// Set the workerSrc
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
export default function PDFViewer() {
  const url = useSearchParams().get("url");
  const control = usePdfControl();
  const {
    setPageNumber,
    setNumPages,
    scale,
    pageNumber,
    numPages,
    setPdfDoc,
    pdfDoc,
    setPdfFile,
    currentMatchIndex,
    matches,
  } = control;

  const onDocumentLoadSuccess = (doc: pdfjs.PDFDocumentProxy) => {
    setPdfDoc(doc);
    setNumPages(doc.numPages);
    setPageNumber(1);

    url && setPdfFile(decodeURIComponent(url));
  };

  const onDocumentLoadError = (err: Error) => {
    handleApiError(err.message);
  };

  const nextPage = () => {
    if (pageNumber < (numPages || 1)) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  const file = useMemo(
    () => ({
      url: decodeURIComponent(url as string),
    }),
    [url]
  );
  if (typeof url !== "string" || url.trim() === "") {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Invalid PDF URL
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full space-y-4 relative">
      <PDFControl control={control} />
      {/* Controls */}

      {/* PDF Viewer */}
      <Document
        file={file.url}
        className={"bg-white shadow-lg border"}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<Loader />}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            className={"shadow border"}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        ))}
      </Document>
    </div>
  );
}
