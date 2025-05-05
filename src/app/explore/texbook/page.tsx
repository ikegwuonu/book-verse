"use client";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set the workerSrc
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0); // for zoom

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Controls */}
      <div className="flex gap-4">
        <button onClick={() => setScale(scale + 0.2)}>Zoom In</button>
        <button onClick={() => setScale(scale - 0.2)} disabled={scale <= 0.4}>
          Zoom Out
        </button>
        <button onClick={prevPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>

      {/* PDF Viewer */}
      <Document
        file={{
          url: "https://ik.imagekit.io/ikegwuonu/JUNIOR_FRONTEND_DEVELOPER___TECHNICAL_ASSESSMENT__1__ZLnbcum6l.pdf",
        }}
        // or file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading PDF..."
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>

      {/* Page Indicator */}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
