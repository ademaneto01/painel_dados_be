import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const signURL = new URL('/login', request.url);
  const home = new URL('/', request.url);
  if (!token) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }

    return NextResponse.redirect(signURL);
  }
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(home);
  }
}

export const config = {
  matcher: ['/login', '/'],
};
