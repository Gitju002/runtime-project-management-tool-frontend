import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const admin = false; // Set this dynamically based on your authentication logic
  const authCookie = request.cookies.get("auth-cookie");
  const loginUrl = new URL("/login", origin);
  const adminUrl = new URL("/admin", origin);
  const userUrl = new URL("/user", origin);

  // Regex patterns for routes
  const adminRouteRegex = /^\/admin(\/|$)/;
  const userRouteRegex = /^\/user(\/|$)/;

  if (pathname === "/") {
    return NextResponse.redirect(admin ? adminUrl : userUrl);
  }

  // Admin-specific route redirection
  if (admin && adminRouteRegex.test(pathname)) {
    if (!pathname.startsWith(adminUrl.pathname)) {
      return NextResponse.redirect(adminUrl);
    }
  }

  // Non-admin user-specific route redirection
  if (!admin && userRouteRegex.test(pathname)) {
    if (!pathname.startsWith(userUrl.pathname)) {
      return NextResponse.redirect(userUrl);
    }
  }

  // Uncomment if authentication check is needed
  // if (!authCookie) {
  //   if (pathname !== "/login") {
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
