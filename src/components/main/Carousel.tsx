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
        imageSrc: '/images/carousel/1.jpg',
        title: 'Реализуй свои фантазии!!!!',
        description: '',
    },
    {
        id: 2,
        imageSrc: '/images/carousel/2.jpg',
        title: 'Клумба ПАВЛИН',
        description: 'Клумба реализована посадочным материалом FLW.BY нашими партнерами',
    },
    {
        id: 3,
        imageSrc: '/images/carousel/3.jpg',
        title: 'Домашняя клумба',
        description: 'Клумба нашего постоянного покупателя',
    }
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