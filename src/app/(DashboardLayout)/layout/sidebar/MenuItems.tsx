import {IconHeartHandshake, IconLayoutDashboard, IconLibraryPhoto, IconMapPin, IconMenu3, IconShoppingBag} from "@tabler/icons-react";

import {uniqueId} from "lodash";

const Menuitems = [

  {
    navlabel: true,
    subheader: "МЕНЮ",
  },

  {
    id: uniqueId(),
    title: "Главная",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Каталог",
    icon: IconMenu3,
    href: "/catalog",
  },
  // {
  //   id: uniqueId(),
  //   title: "Галерея (dev)",
  //   icon: IconLibraryPhoto,
  //   href: "/gallery",
  // },
  {
    id: uniqueId(),
    title: "Контакты",
    icon: IconMapPin,
    href: "/contacts",
  },
  // {
  //   id: uniqueId(),
  //   title: "Оплата и доставка (dev)",
  //   icon: IconShoppingBag,
  //   href: "/payment",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Партнеры (dev)",
  //   icon: IconHeartHandshake,
  //   href: "/partners",
  // },
];

export default Menuitems;


