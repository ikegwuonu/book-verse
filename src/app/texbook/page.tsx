"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useMemo, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import PDFControl from "./PDF-Control";
import usePdfControl from "@/hooks/use-pdf-control";

// Set the workerSrc
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
export default function PDFViewer() {
  const control = usePdfControl();
  const {
    setPageNumber,
    setNumPages,
    scale,
    pageNumber,
    numPages,
    setPdfDoc,
    pdfDoc,
    currentMatchIndex,
    matches,
  } = control;

  const onDocumentLoadSuccess = (doc: pdfjs.PDFDocumentProxy) => {
    setPdfDoc(doc);
    setNumPages(doc.numPages);
    setPageNumber(1);
  };

  const nextPage = () => {
    if (pageNumber < (numPages || 1)) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  const file = useMemo(
    () => ({
      url: "https://ik.imagekit.io/ikegwuonu/JUNIOR_FRONTEND_DEVELOPER___TECHNICAL_ASSESSMENT__1__ZLnbcum6l.pdf",
    }),
    []
  );
  return (
    <div className="flex flex-col items-center w-full space-y-4 relative">
      <PDFControl control={control} />
      {/* Controls */}

      {/* PDF Viewer */}
      <Document
        file={file.url}
        className={"bg-white shadow-lg border"}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading PDF..."
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
