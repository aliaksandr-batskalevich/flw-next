import {FlowerColor} from '../types/flower.type';

export function getFlowerColor(color: FlowerColor): string {
    switch (color) {
        case FlowerColor.GREEN:
            return 'Зеленый';
        case FlowerColor.RED:
            return 'Красный';
        case FlowerColor.PINK:
            return 'Розовый';
        case FlowerColor.WHITE:
            return 'Белый';
        case FlowerColor.BLUE:
            return 'Синий';
        case FlowerColor.BURGUNDY:
            return 'Бургунд';
        case FlowerColor.MIX:
            return 'Микс';
        default:
            throw new Error('Unknown Flower Color');
    }
}

// Функции для получения опций для селектов
export function getFlowerColorOptions() {
    return Object.values(FlowerColor).map(value => ({
        value,
        label: getFlowerColor(value),
    }));
}
