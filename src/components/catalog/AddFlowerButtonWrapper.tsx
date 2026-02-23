'use client';

import dynamic from 'next/dynamic';
import {AddFlowerButtonProps} from "./AddFlowerButton";

// Динамический импорт с отключением SSR
const AddFlowerButton = dynamic(() => import('./AddFlowerButton'), { ssr: false });

export default function AddFlowerButtonWrapper(props: AddFlowerButtonProps) {
    return <AddFlowerButton {...props} />;
}