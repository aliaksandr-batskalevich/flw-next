// Централизованное управление эндпоинтами
export const API_ENDPOINTS = {
    FLOWERS: {
        LIST: '/api/flowers',
        DETAIL: (id: string) => `/api/flowers/${id}`,
    },
} as const;