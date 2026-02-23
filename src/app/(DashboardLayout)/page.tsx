import PageContainer from '../../components/container/PageContainer';
import Carousel from "../../components/main/Carousel";
import AdvantagesSection from "../../components/main/AdvantagesSection";
import Popular from "../../components/main/Popular";
import Blog from "../../components/main/Blog";

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
