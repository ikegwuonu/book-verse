// middleware.ts

import { adminRoutes } from "@/lib/routes";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
}

export const config = {
  matcher: ["/admin/:path*"], // Protects all subroutes under /admin
};
