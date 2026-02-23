import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        const jwtSecret = process.env.ADMIN_JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('Missing JWT secret');
        }

        const decoded = verify(token, jwtSecret);

        return NextResponse.json({
            authenticated: true,
            user: decoded,
        });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }
}