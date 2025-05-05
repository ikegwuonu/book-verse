import { Timestamp } from "firebase/firestore";

export type UploadFileResponse = {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  fileType: string;
  AItags: any;
};
export interface IAdminInfo {
  created_at: string;
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  notes: string;
  role: string;
}
export interface IGetTextBook {
  academic_level: string;
  added_by: string;
  author: string;
  cover: string;
  created_at: Timestamp;
  department: string;
  edition: string;
  faculty: string;
  isbn: string;
  keywords: string;
  status: string;
  title: string;
}
export interface IGetAdmin {
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  notes?: string;
  image: string;
  created_at: Timestamp;
}
export interface IUpdateAdmin {
  first_name: string;
  last_name: string;
  email: string;
}
export interface IUpdateTextbook {
  author: string;
  title: string;
  isbn?: string;
}
