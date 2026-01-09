import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname (e.g. vercel.com, localhost:3000)
  let hostname = req.headers.get("host")!;

  // Remove port if present (common in localhost)
  hostname = hostname.split(':')[0];

  // Normalize www
  if (hostname.startsWith("www.")) {
    hostname = hostname.replace("www.", "");
  }

  // Handle custom domain replacement
  if (hostname.endsWith(`.localhost`)) {
     hostname = hostname.replace(".localhost", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  }

  console.log(`[MIDDLEWARE] Host: ${req.headers.get("host")}, Hostname: ${hostname}`);

  // Special case for Vercel preview URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Rewrite everything to `/_sites/[site] dynamic route
  const rewriteUrl = `/sites/${hostname}${path}`;
  console.log(`[MIDDLEWARE] Rewriting to: ${rewriteUrl}`);
  return NextResponse.rewrite(new URL(rewriteUrl, req.url));
}
