// Lib Imports.
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url));
}

// Middleware config file.
export const config = {
  matcher: '/profiles',
};
