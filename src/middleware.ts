import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const encodedSecret = new TextEncoder().encode(process.env.JWT_KEY as string);

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const authToken = request.cookies.get("auth_token");
  const tokenValue = authToken?.value;
  let roleID: number | null = null;

  if (tokenValue) {
    try {
      const decoded = await jose.jwtVerify(tokenValue, encodedSecret);
      roleID = decoded.payload.roleId as number;
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  }

  const isAdmin = roleID === 1;
  // console.log("Is Admin:", isAdmin);

  // const loginUrl = new URL("/login", origin);
  const loginUrl = new URL("/app-login", origin);
  const adminUrl = new URL("/admin", origin);
  const userUrl = new URL("/user", origin);
  const profileUrl = new URL("/profile", origin);

  const adminRouteRegex = /^\/admin(\/|$)/;
  const userRouteRegex = /^\/user(\/|$)/;

  if (!authToken && pathname.startsWith(profileUrl.pathname)) {
    return NextResponse.redirect(loginUrl);
  }

  // If no token and not on login page, redirect to login
  if (!authToken && !pathname.startsWith(loginUrl.pathname)) {
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated but on login page, redirect based on role
  if (authToken && pathname.startsWith(loginUrl.pathname)) {
    return NextResponse.redirect(isAdmin ? adminUrl : userUrl);
  }

  // Redirect root path `/` based on role
  if (pathname === "/") {
    return NextResponse.redirect(isAdmin ? adminUrl : userUrl);
  }

  // 🚀 **Protect `/admin` routes**: Only allow if `isAdmin` is true
  if (adminRouteRegex.test(pathname) && !isAdmin) {
    return NextResponse.redirect(userUrl);
  }

  // 🚀 **Protect `/user` routes**: Only allow if NOT an admin
  if (userRouteRegex.test(pathname) && isAdmin) {
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

// ✅ Middleware applies to all routes except static assets
export const config = {
  matcher: [
    "/((?!_next|videos|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm)).*)",
    "/(api|trpc)(.*)",
  ],
};
