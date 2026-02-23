import {FlowerType} from '../types/flower.type';

export function getFlowerType(type: FlowerType): string {
    switch (type) {
        case FlowerType.BUSH:
            return 'Кустовой';
        case FlowerType.AMPELOUS:
            return 'Ампельный';

        default:
            throw new Error('Unknown Flower Type');
    }
}

export function getFlowerTypeOptions() {
    return Object.values(FlowerType).map(value => ({
        value,
        label: getFlowerType(value),
    }));
}