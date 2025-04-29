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
    }), // 10MB limit
});
export type addAdminSchemaType = z.infer<typeof addAdminSchema>;
