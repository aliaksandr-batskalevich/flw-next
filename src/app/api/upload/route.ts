import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json(
                { error: 'Файл не найден' },
                { status: 400 }
            )
        }

        // Валидация типа файла
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'Можно загружать только изображения' },
                { status: 400 }
            )
        }

        // Валидация размера (до 5 МБ)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'Размер файла не должен превышать 5 МБ' },
                { status: 400 }
            )
        }

        // Генерируем уникальное имя
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const ext = path.extname(file.name)
        const filename = `${uniqueSuffix}${ext}`

        // Путь для сохранения
        const uploadDir = path.join(process.cwd(), 'public/uploads/flowers')
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        const filepath = path.join(uploadDir, filename)

        // Сохраняем файл
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filepath, buffer)

        // Возвращаем URL
        const url = `/uploads/flowers/${filename}`
        return NextResponse.json({ url })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        )
    }
}