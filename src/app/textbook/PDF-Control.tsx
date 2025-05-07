import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { WhatsappShareButton } from "react-share";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize,
  Printer,
  RotateCw,
  Search,
  Share,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React from "react";
import { pdfjs } from "react-pdf";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Find } from "./Find";
import { config } from "@/lib/config";

interface PDFControlProps {
  control: {
    numPages: number | null;
    setNumPages: React.Dispatch<React.SetStateAction<number | null>>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
    rotation: number;
    setRotation: React.Dispatch<React.SetStateAction<number>>;
    isFullscreen: boolean;
    setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
    pdfFile: string;
    setPdfFile: React.Dispatch<React.SetStateAction<string>>;
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    isSearchOpen: boolean;
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPageNav: boolean;
    setIsPageNav: React.Dispatch<React.SetStateAction<boolean>>;
    pdfDoc: pdfjs.PDFDocumentProxy | null;
    setPdfDoc: React.Dispatch<
      React.SetStateAction<pdfjs.PDFDocumentProxy | null>
    >;
    setMatches: React.Dispatch<
      React.SetStateAction<
        { page: number; textItems: any[]; matchIndexes: number[] }[]
      >
    >;
    matches: { page: number; textItems: any[]; matchIndexes: number[] }[];

    currentMatchIndex: number;
    setCurrentMatchIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}
const PDFControl = ({ control }: PDFControlProps) => {
  const {
    setPdfDoc,
    pdfDoc,
    numPages,
    setNumPages,
    pageNumber,
    setPageNumber,
    scale,
    setScale,
    rotation,
    setRotation,
    isFullscreen,
    setIsFullscreen,
    pdfFile,
    setPdfFile,
    searchText,
    setSearchText,
    isSearchOpen,
    setIsSearchOpen,
    matches,
    setMatches,
    currentMatchIndex,
    setCurrentMatchIndex,
  } = control;
  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale((prevScale: number) => Math.min(prevScale + 0.1, 3));
  }

  function zoomOut() {
    setScale((prevScale: number) => Math.max(prevScale - 0.1, 0.5));
  }

  function rotate() {
    console.log(rotation);
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  }
  console.log(isSearchOpen);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }

  const searchInPdf = async (query: searchPDFSchemaType) => {
    if (!pdfDoc) return;

    const lowerQuery = searchText.toLowerCase();
    const matchResults: {
      page: number;
      textItems: any[];
      matchIndexes: number[];
    }[] = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const textItems = content.items as any[];

      const pageText = textItems.map((item) => item.str).join(" ");
      const matchIndexes: number[] = [];

      textItems.forEach((item, idx) => {
        if (item.str.toLowerCase().includes(lowerQuery)) {
          matchIndexes.push(idx);
        }
      });

      if (matchIndexes.length > 0) {
        matchResults.push({ page: i, textItems, matchIndexes });
      }
    }

    setMatches(matchResults);
    setCurrentMatchIndex(0);

    if (matchResults.length > 0) {
      setPageNumber(matchResults[0].page);
    }
  };

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = (prevPageNumber || 0) + offset;
      return newPageNumber >= 1 && newPageNumber <= (numPages || 1)
        ? newPageNumber
        : prevPageNumber;
    });
  }
  const searchPDFSchema = z.object({
    text: z.string().min(1, "Required"),
  });
  type searchPDFSchemaType = z.infer<typeof searchPDFSchema>;
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchPDFSchema),
  });

  return (
    <>
      <div className="sticky top-16 z-10 w-full bg-white dark:bg-gray-800 shadow-md h-fit mb-4">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={zoomOut}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <div className="w-20">
                <Slider
                  value={[scale * 100]}
                  min={50}
                  max={300}
                  step={10}
                  onValueChange={(value) => setScale(value[0] / 100)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={zoomIn}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <span className="text-sm hidden sm:inline">
                {Math.round(scale * 100)}%
              </span>
            </div>
            {control.isPageNav && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  title="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {pageNumber} of {numPages || "--"}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  disabled={numPages === null || pageNumber >= numPages}
                  title="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {control.isPageNav && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => rotate()}
                  title="Rotate"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              )}

              <WhatsappShareButton
                url={config.env.prodApiEndpoint + "textbook?url=" + pdfFile}
              >
                <Button variant="outline" size="icon" title="Share">
                  {" "}
                  <Share2 className="w-3 cursor-pointer" />
                </Button>
              </WhatsappShareButton>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                title="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>

              <Button variant="outline" size="icon" asChild title="Download">
                <a href={pdfFile} download target="_blank">
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <form
              onSubmit={handleSubmit(searchInPdf)}
              className="mt-2 flex items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Search in document..."
                {...register("text")}
                className="w-full"
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button type="submit">Search</Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PDFControl;

export function FindButton() {
  const handleFindClick = () => {
    try {
      // For cross-browser compatibility
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const event = new KeyboardEvent("keydown", {
        key: "f",
        ctrlKey: !isMac,
        metaKey: isMac,
        bubbles: true,
        cancelable: true,
      });

      document.dispatchEvent(event);
    } catch (error) {
      console.error("Failed to trigger find:", error);
      // Fallback for browsers that block synthetic events
      document.designMode = "on";
      document.execCommand("find");
      document.designMode = "off";
    }
  };
}
