import { NextResponse } from "next/server";

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  if (path === "/2") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
