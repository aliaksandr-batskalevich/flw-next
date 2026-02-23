import { Flower } from '@prisma/client';
import {FlowerColor, FlowerType, FlowerCategory} from '../types/flower.type';


export class FlowerDto {
    id: string;
    name: string;
    subName?: string;
    color: FlowerColor;
    colorDescription?: string;
    type: FlowerType;
    category: FlowerCategory;
    price: number;
    isSale: boolean;
    isHit: boolean;
    isLittleLeft: boolean;
    smallPhoto: string;
    largePhoto: string;
    isActive: boolean;
    createdAt: Date;

    constructor(flower: Flower) {
        this.id = flower.id;
        this.name = flower.name;
        this.subName = flower.subName || undefined;
        this.color = flower.color as FlowerColor;
        this.colorDescription = flower.colorDescription || undefined;
        this.type = flower.type as FlowerType;
        this.category = flower.category as FlowerCategory;
        this.price = flower.price;
        this.isSale = flower.isSale;
        this.isHit = flower.isHit;
        this.isLittleLeft = flower.isLittleLeft;
        this.smallPhoto = flower.smallPhoto;
        this.largePhoto = flower.largePhoto;
        this.isActive = flower.isActive;
        this.createdAt = flower.createdAt;
    }
}