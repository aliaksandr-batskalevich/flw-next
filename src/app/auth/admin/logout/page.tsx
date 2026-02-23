'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogoutPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await fetch('/api/auth/admin', {
                    method: 'DELETE',
                });

                if (res.ok) {
                    router.push('/'); // редирект на главную
                } else {
                    const data = await res.json();
                    setError(data.error || 'Ошибка при выходе');
                    // Можно также редиректить через таймаут
                    setTimeout(() => router.push('/'), 2000);
                }
            } catch (err) {
                setError('Сетевая ошибка');
                setTimeout(() => router.push('/'), 2000);
            }
        };

        logout();
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
        }}>
            {error ? (
                <>
                    <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>
                    <p>Перенаправление на главную...</p>
                </>
            ) : (
                <>
                    <div style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #1976d2',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        animation: 'spin 1s linear infinite',
                        marginBottom: 16,
                    }} />
                    <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
                    <p>Выход из системы...</p>
                </>
            )}
        </div>
    );
}