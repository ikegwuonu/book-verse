import { NextResponse } from "next/server";
import { authenticator } from "../../auth";
import { showerror } from "./toast";
import { config } from "./config";
import { handleApiError } from "./utils";
import { error } from "console";
import { UploadFileResponse } from "./types";

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
