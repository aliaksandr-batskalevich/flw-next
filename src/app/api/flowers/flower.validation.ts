import {z} from 'zod';
import {FlowerColor, FlowerType, FlowerCategory} from '../../../types/flower.type';

// Валидация query-параметров с Zod
export const getFlowersSchema = z.object({
    page: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).max(100).default(20),
    hit: z.coerce.boolean().optional(),
});

// Схема валидации для создания цветка
export const flowerCreateSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    subName: z.string().optional().nullable(),
    color: z.enum(Object.values(FlowerColor) as [string, ...string[]]),
    colorDescription: z.string().optional().nullable(),
    type: z.enum(Object.values(FlowerType) as [string, ...string[]]),
    category: z.enum(Object.values(FlowerCategory) as [string, ...string[]]),
    price: z.number().positive('Цена должна быть положительным числом'),
    isSale: z.boolean().optional().default(false),
    isHit: z.boolean().optional().default(false),
    isLittleLeft: z.boolean().optional().default(false),
    smallPhoto: z.string().min(1, 'URL фото обязателен'),
    largePhoto: z.string().min(1, 'URL фото обязателен'),
});

export const flowerUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    subName: z.string().nullable().optional(),
    color: z.enum(Object.values(FlowerColor) as [string, ...string[]]).optional(),
    colorDescription: z.string().nullable().optional(),
    type: z.enum(Object.values(FlowerType) as [string, ...string[]]).optional(),
    category: z.enum(Object.values(FlowerCategory) as [string, ...string[]]).optional(),
    price: z.number().positive().optional(),
    isSale: z.boolean().optional(),
    isHit: z.boolean().optional(),
    isLittleLeft: z.boolean().optional(),
    smallPhoto: z.string().min(1).optional(),
    largePhoto: z.string().min(1).optional(),
});

export type FlowerCreateData = z.infer<typeof flowerCreateSchema>;
export type FlowerUpdateData = z.infer<typeof flowerUpdateSchema>;