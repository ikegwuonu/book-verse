import { z } from "zod";

export const addAdminSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  //   password: z
  //     .string()
  //     .min(8, { message: "Password must be at least 8 characters long" })
  //     .trim()
  //     .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
  //     .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  role: z.string().min(1, { message: "Role is required" }),
  notes: z.string().optional(),
  //   send_invite: z.boolean().optional(),
  image: z
    .any()
    // .refine((file) => file?.length < 1, { message: " File is required" })
    .refine((file) => file?.size <= 10 * 1024 * 1024, {
      message: "File must be less than 10MB",
    }),
});
export type addAdminSchemaType = z.infer<typeof addAdminSchema>;

export const addTextbookSchema = z.object({
  author: z.string().min(1, { message: "Author is required" }),
  document: z.any().refine((file) => file?.size <= 20 * 1024 * 1024, {
    message: "Document must be less than 10MB",
  }),
  cover: z
    .any()
    //.refine((file) => file?.length < 1, { message: " File is required" })
    .refine((file) => file?.size <= 10 * 1024 * 1024, {
      message: "Image must be less than 10MB",
    }),
  department: z.string().min(1, { message: "Department is required" }),
  edition: z.string().optional(),
  faculty: z.string().min(1, { message: "Faculty is required" }),
  note: z.string().optional(),
  status: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  academic_level: z.string().min(1, { message: "Academic level is required" }),
  keywords: z.string(),
  isbn: z.string().optional(),
});
export type addTextbookSchemaType = z.infer<typeof addTextbookSchema>;

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export type loginSchemaType = z.infer<typeof loginSchema>;
export const resetPwdSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
});
export type resetPwdSchemaType = z.infer<typeof resetPwdSchema>;
export const updateTextbookSchema = z.object({
  author: z.string().min(1, { message: "Author is required" }),
  cover: z.string().min(1, { message: "Image url is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  edition: z.string().optional(),
  faculty: z.string().min(1, { message: "Faculty is required" }),
  note: z.string().optional(),
  status: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  academic_level: z.string().min(1, { message: "Academic level is required" }),
  keywords: z.string(),
  isbn: z.string().optional(),
});
export type updateTextbookSchemaType = z.infer<typeof updateTextbookSchema>;
