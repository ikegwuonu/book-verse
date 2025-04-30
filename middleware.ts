// middleware.ts

import { firebaseAdminAuth } from "@/lib/firebase-admin";
import { adminRoutes } from "@/lib/routes";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  try {
    const decoded = await firebaseAdminAuth.verifyIdToken(token);
    console.log("Verified token for:", decoded.email);
    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
  // try {
  //   await firebaseAdminAuth.verifyIdToken(token);
  //   return NextResponse.next(); // allow access
  // } catch (err) {
  //   return NextResponse.redirect(new URL("/admin/login", req.url));
  // }
}

export const config = {
  matcher: ["/admin/:path*"], // Protects all subroutes under /admin
};
