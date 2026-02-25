import PageContainer from '../../components/container/PageContainer';
import Carousel from "../../components/main/Carousel";
import AdvantagesSection from "../../components/main/AdvantagesSection";
import Popular from "../../components/main/Popular";
import Blog from "../../components/main/Blog";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Flw.by - Рассада цветов оптом. Купить рассаду петунии, бегонии в Минске, Бресте',
    description: 'У нас вы можете заказать рассаду однолетних цветов по выгодным ценам. Бесплатная доставка по Минску, Бресту. Звоните: +375 29 277 75',
    keywords: 'бегония купить рассаду, рассада однолетних цветов оптом, рассада цветов оптом, рассада цветов минск, агератум купить, агератум купить рассаду, агератум рассада, бегонии купить +в беларуси, бегонии купить интернет, бегония вечноцветущая купить, бегония купить +в интернет магазине, бегония купить рассаду, бегония цена, где купить бегонию, где купить рассаду цветов оптом, купить бегонию +в минске, купить рассаду цветов, купить рассаду цветов, купить рассаду цветов +в минске дешево, купить рассаду цветов оптом, купить саженцы петунии, купить цветочную рассаду +в минске, купить цветы бегонии, куплю бегонии цветущие, петуния минск, петуния оптом, петуния цена, рассада однолетних цветов, рассада однолетних цветов оптом, рассада петунии купить +в минске, рассада петунии оптом',
};

const Main = () => {
    return (
        <PageContainer title="Центр качественной рассады" description="this is Dashboard">
            <Carousel/>
            <AdvantagesSection/>
            <Popular/>
            <Blog/>
        </PageContainer>
    );
}

export default Main;
