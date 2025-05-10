"use client";

import { useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import { pdfjs } from "react-pdf";

// Use UMD build for better Next.js compatibility
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  url: string;
};

export default function PDFViewer({ url }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTask = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let page: any = null;

    const renderPDF = async () => {
      try {
        if (!canvasRef.current) return;

        const loadingTask = getDocument(url);
        const pdf = await loadingTask.promise;
        if (!isMounted) return;

        page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Canvas context not available");

        // Handle PDF rotation
        const rotation = viewport.rotation;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Apply rotation transformations
        if (rotation === 180) {
          context.translate(canvas.width, canvas.height);
          context.rotate(Math.PI);
        }

        // Render PDF page
        renderTask.current = page.render({
          canvasContext: context,
          viewport: viewport,
        });

        await renderTask.current.promise;
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("PDF error:", error);
        }
      }
    };

    renderPDF();

    return () => {
      isMounted = false;
      if (renderTask.current) {
        renderTask.current.cancel();
        renderTask.current = null;
      }
      if (page) {
        page.cleanup();
      }
    };
  }, [url]);

  return <canvas ref={canvasRef} className="w-full h-auto" />;
}
