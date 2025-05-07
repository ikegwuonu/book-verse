import { createContext, Dispatch } from "react";

export interface IState {
  numPages: number | null;
  setNumPages: (value: React.SetStateAction<number | null>) => void;

  pageNumber: number;
  setPageNumber: (value: React.SetStateAction<number>) => void;

  scale: number;
  setScale: (value: React.SetStateAction<number>) => void;

  rotation: number;
  setRotation: (value: React.SetStateAction<number>) => void;

  isFullscreen: boolean;
  setIsFullscreen: (value: React.SetStateAction<boolean>) => void;

  pdfFile: string;
  setPdfFile: (value: React.SetStateAction<string>) => void;

  searchText: string;
  setSearchText: (value: React.SetStateAction<string>) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isPageNav: boolean;
  setIsPageNav: (value: React.SetStateAction<boolean>) => void;
}

export const PDFContext = createContext<IState>({
  numPages: 1,
  setNumPages: () => {},

  pageNumber: 1,
  setPageNumber: () => {},

  scale: 1.0,
  setScale: () => {},

  rotation: 0,
  setRotation: () => {},

  isFullscreen: false,
  setIsFullscreen: () => {},

  pdfFile: "/sample.pdf",
  setPdfFile: () => {},

  searchText: "",
  setSearchText: () => {},

  isSearchOpen: false,
  setIsSearchOpen: () => {},

  isPageNav: false,
  setIsPageNav: () => {},
});
