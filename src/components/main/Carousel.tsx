'use client'

import React from 'react';
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'

interface CarouselItem {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
}

const carouselItems: CarouselItem[] = [
    {
        id: 1,
        imageSrc: '/images/carousel/2.jpeg',
        title: 'Секрет идеальной клумбы: здоровая рассада и капелька любви',
        description: '',
    },
    {
        id: 2,
        imageSrc: '/images/carousel/3.jpeg',
        title: 'Ваш личный оазис начинается здесь',
        description: '',
    },
    {
        id: 3,
        imageSrc: '/images/carousel/4.jpeg',
        title: 'Когда каждый лепесток — произведение искусства',
        description: '',
    },
    {
        id: 4,
        imageSrc: '/images/carousel/5.jpeg',
        title: 'Цветотерапия на вашем участке: создаем настроение своими руками',
        description: '',
    },
    {
        id: 5,
        imageSrc: '/images/carousel/6.jpeg',
        title: 'Статус: в активном поиске... идеального места для этой петунии',
        description: '',
    },
    {
        id: 6,
        imageSrc: '/images/carousel/7.jpeg',
        title: 'Цветотерапия на вашем участке: создаем настроение своими руками',
        description: '',
    },
    {
        id: 7,
        imageSrc: '/images/carousel/8.jpeg',
        title: 'Статус: в активном поиске... идеального места для этой петунии',
        description: '',
    },
];

const Carousel = () => {
    return (
        <CCarousel
            controls
            indicators
            interval={5000}
            pause
        >
            {carouselItems.map((item) => (
                <CCarouselItem key={item.id}>
                    <CImage className="d-block w-100" src={item.imageSrc} alt={item.title} />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                    </CCarouselCaption>
                </CCarouselItem>
            ))}
        </CCarousel>
    );
};

export default Carousel;