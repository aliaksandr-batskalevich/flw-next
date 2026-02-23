import {FlowerCategory} from '../types/flower.type';

export function getFlowerCategory(category: FlowerCategory): string {
    switch (category) {
        case FlowerCategory.ANNUAL:
            return 'Однолетний';
        case FlowerCategory.PERENNIAL:
            return 'Многолетний';

        default:
            throw new Error('Unknown Flower Caytegory');
    }
}

export function getFlowerCategoryOptions() {
    return Object.values(FlowerCategory).map(value => ({
        value,
        label: getFlowerCategory(value),
    }));
}