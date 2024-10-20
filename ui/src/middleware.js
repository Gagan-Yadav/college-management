import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get("jwt")?.value;
    if (!token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard', '/login'],
};
