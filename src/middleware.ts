import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

declare module 'jwt-decode' {
  export default function jwtDecode<T = any>(token: string): T;
}

function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const signURL = new URL('/login', request.url);
  const home = new URL('/', request.url);
  if (!token || isTokenExpired(token)) {
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
  matcher: ['/'],
};
