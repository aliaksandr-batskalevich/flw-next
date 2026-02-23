import {IconHeartHandshake, IconLayoutDashboard, IconLibraryPhoto, IconMapPin, IconMenu3,} from "@tabler/icons-react";

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
  {
    id: uniqueId(),
    title: "Галерея",
    icon: IconLibraryPhoto,
    href: "/gallery",
  },
  {
    id: uniqueId(),
    title: "Контакты",
    icon: IconMapPin,
    href: "/contacts",
  },
  {
    id: uniqueId(),
    title: "Партнеры",
    icon: IconHeartHandshake,
    href: "/partners",
  },
];

export default Menuitems;


