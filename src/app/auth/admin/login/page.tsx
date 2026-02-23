'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(
                    '/api/auth/admin/me',
                    {credentials: 'include'});
                const data = await res.json();
                if (data.authenticated) {
                    router.push('/catalog/admin');
                }
            } catch (err) {
                console.error('Auth check failed', err);
            } finally {
                setChecking(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(
                '/api/auth/admin',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username, password}),
                    credentials: 'include',
                },
            );

            if (res.ok) {
                router.push('/catalog/admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Ошибка авторизации');
            }
        } catch (err) {
            setError('Ошибка сети');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <div style={{textAlign: 'center'}}>
                    <div style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #1976d2',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px',
                    }}/>
                    <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
                    <p>Проверка авторизации...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8}}>
            <h1 style={{marginBottom: 20}}>Вход для администратора</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: 16}}>
                    <label style={{display: 'block', marginBottom: 4}}>Логин</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
                        required
                    />
                </div>
                <div style={{marginBottom: 16}}>
                    <label style={{display: 'block', marginBottom: 4}}>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
                        required
                    />
                </div>
                {error && <p style={{color: 'red', marginBottom: 16}}>{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 16,
                    }}
                >
                    {loading ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
        </div>
    );
}