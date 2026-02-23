// PATCH /api/flowers/[id] - обновить цветок
import {NextResponse} from "next/server";
import {flowerUpdateSchema} from "../flower.validation";
import {FlowerService} from "../../../../services/flower.service";
import {FlowerDto} from "../../../../dtos/flower.dto";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Проверяем, что id имеет формат UUID (необязательно, но желательно)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return NextResponse.json({ error: 'Некорректный идентификатор' }, { status: 400 });
        }

        const body = await request.json();

        // Валидируем данные
        const validation = flowerUpdateSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Ошибка валидации', details: validation.error.issues },
                { status: 400 }
            );
        }

        // Проверяем, существует ли цветок
        const existingFlower = await FlowerService.getFlowerById(id);

        if (!existingFlower) {
            return NextResponse.json({ error: 'Цветок не найден' }, { status: 404 });
        }

        // Обновляем запись
        const updatedFlower = await FlowerService.updateFlower(id, validation.data);

        return NextResponse.json(new FlowerDto(updatedFlower));
    } catch (error) {
        console.error('Error updating flower:', error);
        return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}