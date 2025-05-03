"use server";
import { NextResponse } from "next/server";
import { authenticator } from "./imagekit-auth";
import { showerror } from "./toast";
import { config } from "./config";
import { handleApiError } from "./utils";
import { error } from "console";
import { UploadFileResponse } from "./types";
import { loginSchemaType } from "./form-validation";
//import { auth } from "./firebase-init";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { AuthError } from "firebase/auth";

export async function uploadFile(
  file: File
): Promise<UploadFileResponse | void> {
  try {
    if (!file) throw new Error("No file uploaded");

    const { signature, expire, token } = await authenticator();

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);
    form.append("signature", signature);
    form.append("expire", expire);
    form.append("token", token);
    form.append("publicKey", config.env.imagekit.publicKey);

    const uploadResponse = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: form,
      }
    );
    if (!uploadResponse.ok) throw new Error("Imagekit error");
    const responseText = await uploadResponse.text();

    const uploadData: UploadFileResponse = JSON.parse(responseText);

    return uploadData;
  } catch (error) {
    handleApiError(error);
  }
}

// export async function signIn(data: loginSchemaType) {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password
//     );
//     const token = await userCredential.user.getIdToken();

//     // Set cookie server-side
//     const cookie = await cookies();
//     cookie.set("token", token, {
//       maxAge: 60 * 60 * 24, // 1 day
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     return { success: true };
//   } catch (error) {
//     if (error instanceof Error) {
//       return { success: false, error: error.message };
//     }
//     return { success: false, error: "Failed to sign in" };
//   }
// }
