import { jwtDecode } from 'jwt-decode';

declare module 'jwt-decode' {
  export default function jwtDecode<T = any>(token: string): T;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export default function validateToken(token: string): boolean {
  if (!token || isTokenExpired(token)) {
    return false;
  }
  return true;
}
