"use client";

import { useState, useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  Search,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function Page() {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const embedRef = useRef<HTMLEmbedElement>(null);

  // Sample PDF URL - replace with your actual PDF URL
  const pdfUrl =
    "https://ik.imagekit.io/ikegwuonu/JUNIOR_FRONTEND_DEVELOPER___TECHNICAL_ASSESSMENT__1__ZLnbcum6l.pdf";

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleSearch = () => {
    // In a real implementation, you would use the PDF.js library to search within the PDF
    console.log(`Searching for: ${searchQuery}`);
    // For demonstration purposes only
    alert(
      `Search functionality would search for: "${searchQuery}" in a real implementation`
    );
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex justify-between items-center">
            <span>PDF Document Viewer</span>
            <div className="text-sm text-muted-foreground">
              Page {currentPage}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-slate-100 p-2 flex flex-wrap gap-2 items-center border-b">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <div className="w-20 px-2">
                <Slider
                  value={[zoomLevel]}
                  min={50}
                  max={200}
                  step={10}
                  onValueChange={(value) => setZoomLevel(value[0])}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium ml-1">{zoomLevel}%</span>
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousPage}
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
                title="Search"
                className={showSearch ? "bg-slate-200" : ""}
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Download"
                onClick={() => window.open(pdfUrl, "_blank")}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Print"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showSearch && (
            <div className="p-2 bg-slate-50 border-b flex gap-2">
              <Input
                placeholder="Search in document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8"
              />
              <Button size="sm" onClick={handleSearch}>
                Search
              </Button>
            </div>
          )}

          <div
            className="pdf-container relative overflow-auto border rounded-b-lg"
            style={{ height: "calc(100vh - 250px)", minHeight: "500px" }}
          >
            <embed
              ref={embedRef}
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=${currentPage}`}
              type="application/pdf"
              className="w-full h-full transition-transform duration-200 ease-in-out"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </CardContent>
        <iframe
          className="h-80 w-full border-0"
          id="pdfFrame"
          title="Exam PDF"
          loading="eager"
          src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${pdfUrl}`}
        ></iframe>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        <p>
          Note: Some PDF features depend on the browser's built-in PDF viewer
          capabilities.
        </p>
        <p>
          For advanced functionality, consider using a dedicated PDF.js
          implementation.
        </p>
      </div>
    </div>
  );
}
