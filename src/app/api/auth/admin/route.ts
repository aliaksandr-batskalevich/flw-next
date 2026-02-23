import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.ADMIN_JWT_SECRET;

        if (!adminUsername || !adminPassword || !jwtSecret) {
            console.error('Missing admin credentials in environment variables');
            return NextResponse.json(
                { error: 'Ошибка конфигурации сервера' },
                { status: 500 }
            );
        }

        if (username === adminUsername && password === adminPassword) {
            // Создаём JWT токен (действителен 1 день)
            const token = sign(
                { username, role: 'admin' },
                jwtSecret,
                { expiresIn: '1d' }
            );

            // Устанавливаем httpOnly куку
            const cookieStore = await cookies();
            cookieStore.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24, // 1 день
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: 'Неверные учётные данные' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('admin_token');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}