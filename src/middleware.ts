import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const encodedSecret = new TextEncoder().encode(process.env.JWT_KEY as string);

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const authToken = request.cookies.get("auth_token");
  const tokenValue = authToken?.value;
  let roleID;
  if (tokenValue) {
    try {
      const decoded = await jose.jwtVerify(tokenValue, encodedSecret);
      roleID = decoded.payload.roleId;
    } catch (error) {
      console.error(error);
    }
  }
  const admin = roleID === 1 ? true : false;

  const loginUrl = new URL("/login", origin);
  const adminUrl = new URL("/admin", origin);
  const userUrl = new URL("/user", origin);

  const adminRouteRegex = /^\/admin(\/|$)/;
  const userRouteRegex = /^\/user(\/|$)/;

  if (!authToken && !pathname.startsWith(loginUrl.pathname)) {
    return NextResponse.redirect(loginUrl);
  } else if (authToken && pathname.startsWith(loginUrl.pathname)) {
    return NextResponse.redirect(admin ? adminUrl : userUrl);
  }

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
