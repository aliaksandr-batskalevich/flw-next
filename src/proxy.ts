import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Защищаем все маршруты, начинающиеся с /catalog/admin
    if (path.startsWith('/catalog/admin')) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            // Редирект на страницу входа
            return NextResponse.redirect(new URL('/auth/admin/login', request.url));
        }

        try {
            const jwtSecret = process.env.ADMIN_JWT_SECRET;
            if (!jwtSecret) throw new Error('Missing JWT secret');

            verify(token, jwtSecret);
            // Токен валиден – пропускаем
            return NextResponse.next();
        } catch (error) {
            // Невалидный токен – редирект на логин
            return NextResponse.redirect(new URL('/auth/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/catalog/admin/:path*'],
};