import {NextRequest, NextResponse} from 'next/server';
import {FlowerService} from "../../../services/flower.service";
import {flowerCreateSchema, getFlowersSchema} from './flower.validation';
import {FlowerDto} from "../../../dtos/flower.dto";
import {PaginatedResult} from "../../../dtos/paginated-result.dto";
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET /api/flowers
export async function GET(request: NextRequest) {
    try {
        const searchParams = Object.fromEntries(request.nextUrl.searchParams);

        // Валидация входных параметров
        const validatedParams = getFlowersSchema.safeParse(searchParams);

        if (!validatedParams.success) {
            return NextResponse.json(
                {error: 'Invalid parameters', details: validatedParams.error.issues},
                {status: 400}
            );
        }

        const pageData = await FlowerService.getAllFlowers(validatedParams.data.page, validatedParams.data.limit, validatedParams.data.hit);

        // Добавляем заголовки для кэширования
        const headers = {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        };

        const pageDataDto: PaginatedResult<FlowerDto> = {
            ...pageData,
            data: pageData.data.map((f) => new FlowerDto(f)),
        };

        return NextResponse.json(pageDataDto, {headers});
    } catch (error) {
        console.error('API Error [GET /api/flowers]:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch flowers',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            {status: 500}
        );
    }
}

// POST /api/flowers
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Валидируем входные данные
        const validation = flowerCreateSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Ошибка валидации', details: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Создаём запись в БД
        const flower = await FlowerService.createFlower({
            name: data.name,
            subName: data.subName ?? null,
            color: data.color,
            colorDescription: data.colorDescription ?? null,
            type: data.type,
            category: data.category,
            price: data.price,
            isSale: data.isSale,
            isHit: data.isHit,
            isLittleLeft: data.isLittleLeft,
            smallPhoto: data.smallPhoto,
            largePhoto: data.largePhoto,
        });
        revalidatePath('/catalog');

        return NextResponse.json(new FlowerDto(flower), { status: 201 });
    } catch (error) {
        console.error('Ошибка при создании цветка:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}

