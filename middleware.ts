import { NextResponse, NextRequest } from 'next/server'
import { decodeToken } from './lib/utils/tokenHandler';

export const config = {
    matcher: ['/','/user/:path*','/dashboard/:path*'],
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const cookie = request.cookies.get('token');
    const token = cookie ? cookie.value : undefined;

    const isPublicPath = path == '/user/login' || path == '/user/register';

    if(isPublicPath)
        return NextResponse.next();
    if (path === '/user/login' && request.nextUrl.searchParams.get('error') === 'invalid_token') {
        return NextResponse.next()
    }

    const isTokenValid = await decodeToken(token);
    if(!isTokenValid) {
        const loginUrl = new URL('user/login', request.nextUrl.origin);
        loginUrl.searchParams.set('error', 'invalid_token')
        return NextResponse.redirect(loginUrl)
    }else {
        return NextResponse.next();
    }
}