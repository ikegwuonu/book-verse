import { config } from "@/lib/config";
import { authenticator } from "@/lib/imagekit-auth";
import { UploadFileResponse } from "@/lib/types";
import { handleApiError } from "@/lib/utils";

export const uploadFile = async (
  file: File
): Promise<UploadFileResponse | void> => {
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
};
