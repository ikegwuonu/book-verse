import React, { useState } from "react";
import { pdfjs } from "react-pdf";

export default function usePdfControl() {
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPageNav, setIsPageNav] = useState<boolean>(false);
  const [matches, setMatches] = useState<
    { page: number; textItems: any[]; matchIndexes: number[] }[]
  >([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  return {
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
    isPageNav,
    setIsPageNav,
    pdfDoc,
    setPdfDoc,
    matches,
    setMatches,
    currentMatchIndex,
    setCurrentMatchIndex,
  };
}
