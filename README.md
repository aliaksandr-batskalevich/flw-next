src/
├── app/                    # Next.js App Router (страницы и API routes)
│   ├── api/               # API endpoints (RESTful)
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── flowers/
│   │   ├── orders/
│   │   └── ...
│   ├── catalog/           # Страница каталога
│   ├── cart/              # Страница корзины
│   ├── checkout/          # Оформление заказа
│   ├── admin/             # Админ-панель (если нужно)
│   ├── layout.tsx
│   ├── page.tsx           # Главная страница
│   └── globals.css
├── components/            # React компоненты (разделенные по модулям)
│   ├── catalog/           # Компоненты для каталога
│   ├── cart/              # Компоненты для корзины
│   ├── ui/                # Переиспользуемые UI компоненты (кнопки, инпуты)
│   ├── layout/            # Компоненты макета (хедер, футер, сайдбар)
│   └── ...
├── hooks/                 # Кастомные React хуки
│   ├── useCart.ts
│   ├── useFlowers.ts
│   └── ...
├── lib/                   # Утилиты, конфигурации, вспомогательные функции
│   ├── api/               # API клиент и конфигурация
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── database.ts        # Конфигурация TypeORM
│   ├── validation.ts      # Схемы валидации (Zod)
│   └── ...
├── services/              # Бизнес-логика, работа с данными
│   ├── flower.service.ts
│   ├── CategoryService.ts
│   ├── CartService.ts
│   ├── OrderService.ts
│   └── ...
├── data/                  # Работа с данными (TypeORM)
│   ├── entities/          # Сущности БД
│   ├── repositories/      # Кастомные репозитории
│   ├── migrations/        # Миграции
│   └── seeds/             # Сиды
├── types/                 # Глобальные типы и интерфейсы TypeScript
│   ├── api.ts             # Типы для API
│   ├── entities.ts        # Типы сущностей (можно генерировать из TypeORM)
│   ├── cart.ts            # Типы для корзины
│   └── ...
├── utils/                 # Вспомогательные функции (форматирование, расчеты)
├── proxy.ts          # Next.js proxy
├── .env.local             # Локальные переменные окружения
├── package.json
└── ...