"use server";
import { NextResponse } from "next/server";
import { authenticator } from "./imagekit-auth";
import { showerror } from "./toast";
import { config } from "./config";
import { handleApiError } from "./utils";
import { error } from "console";
import { UploadFileResponse } from "./types";
import { loginSchemaType } from "./form-validation";
import { auth } from "./firebase-init";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export async function uploadFile(
  file: File
): Promise<UploadFileResponse | void> {
  try {
    if (!file) return showerror("No file uploaded");

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

    const responseText = await uploadResponse.text();

    if (!uploadResponse.ok) {
      handleApiError(responseText);
      return;
    }

    const uploadData: UploadFileResponse = JSON.parse(responseText);
    return uploadData;
  } catch (error: any) {
    console.error(error);
    handleApiError(error);
    return;
  }
}

export async function signUp(auth: Auth, data: loginSchemaType) {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (!response.user) {
      return handleApiError("Unauthorized");
    }

    const token = await response.user.getIdToken();
    //console.log(token);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      //httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      // sameSite: "strict", // CSRF protection
    });

    // You could also return user info if needed
    return { message: "Logged in", user: response.user };
  } catch (err) {
    handleApiError(err);
  }
}
