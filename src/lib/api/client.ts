// Конфигурация fetch с переиспользуемыми настройками
class ApiClient {
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
            // Автоматически добавляем куки для аутентификации
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(
                error.message || `HTTP ${response.status}: ${response.statusText}`
            );
        }

        // Если ответ пустой (например, 204 No Content)
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return this.request<T>(`${endpoint}${queryString}`, {
            method: 'GET',
            // Кэширование на уровне fetch
            next: { revalidate: 60 }, // Ревалидация каждые 60 секунд
        });
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

// Singleton instance
export const apiClient = new ApiClient();