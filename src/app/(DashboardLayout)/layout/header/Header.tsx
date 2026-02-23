'use client'

import dynamic from 'next/dynamic';
import {ItemType} from "./HeaderClient";

const HeaderClient = dynamic(() => import('./HeaderClient'), { ssr: false });

export default function Header(props: ItemType) {
  return <HeaderClient {...props}/>
}