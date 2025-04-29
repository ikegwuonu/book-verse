import ImageKit from "imagekit";
import { config } from "@/lib/config";
import { NextResponse } from "next/server";
import { showerror } from "@/lib/toast";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

// Initialize ImageKit with the credentials
const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// Authenticator to get signature for upload

// Handle the GET request to fetch the ImageKit authentication parameters
export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
