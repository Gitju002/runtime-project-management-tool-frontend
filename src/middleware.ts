import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const admin = false;
  const authToken = request.cookies.get("auth-token");

  const loginUrl = new URL("/login", origin);
  const adminUrl = new URL("/admin", origin);
  const userUrl = new URL("/user", origin);

  const adminRouteRegex = /^\/admin(\/|$)/;
  const userRouteRegex = /^\/user(\/|$)/;

  if (pathname === "/") {
    return NextResponse.redirect(admin ? adminUrl : userUrl);
  }

  if (admin && adminRouteRegex.test(pathname)) {
    if (!pathname.startsWith(adminUrl.pathname)) {
      return NextResponse.redirect(adminUrl);
    }
  }

  if (!admin && userRouteRegex.test(pathname)) {
    if (!pathname.startsWith(userUrl.pathname)) {
      return NextResponse.redirect(userUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
