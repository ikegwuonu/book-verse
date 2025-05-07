"use client";
import React, { useState } from "react";
import { PDFContext } from "./PDFContext";
import PDFViewer from "./[url]/page";
import PDFControl from "./PDF-Control";

const PDFContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<string>("/sample.pdf");
  const [searchText, setSearchText] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPageNav, setIsPageNav] = useState<boolean>(false);

  return (
    <PDFContext.Provider
      value={{
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
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};

export default PDFContextProvider;
