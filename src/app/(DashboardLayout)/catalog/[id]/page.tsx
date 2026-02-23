import { notFound } from 'next/navigation';

const FlowerDetailPage = ({ params }: { params: { id: string } }) => {
    // const flower = await getFlower(params.id);
    // if (!flower) return notFound();

    // Просто возвращаем каталог (children для layout)
    return (
        <div>
            Описание товара
            {/*<span>{params.id}</span>*/}
        </div>
    );
};

export default FlowerDetailPage;