import {prisma} from '../lib/prisma';
import {Flower, Prisma} from '@prisma/client';
import {PaginatedResult} from "../dtos/paginated-result.dto";
import {FlowerCreateData, FlowerUpdateData} from "../app/api/flowers/flower.validation";

export class FlowerService {

    static async getAllFlowers(
        page: number = 0,
        limit: number = 12,
    ): Promise<PaginatedResult<Flower>> {
        const skip = page * limit;
        const [flowers, total] = await Promise.all([
            prisma.flower.findMany({
                skip,
                take: limit,
                // orderBy: { createdAt: 'desc' }, // можно добавить сортировку
            }),
            prisma.flower.count(), // общее количество записей
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: flowers,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            }
        };
    }

    static async getFlowerById(id: string): Promise<Flower> {
        const flower = await prisma.flower.findUnique({
            where: { id },
        });
        if (!flower) {
            throw new Error(`Цветок с id ${id} не найден`);
        }
        return flower;
    }

    static async createFlower(data: FlowerCreateData): Promise<Flower> {
        return prisma.flower.create({data});
    }

    static async updateFlower(id: string, data: FlowerUpdateData): Promise<Flower> {
        return prisma.flower.update({
            where: { id },
            data,
        });
    }
}