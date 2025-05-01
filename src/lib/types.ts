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
