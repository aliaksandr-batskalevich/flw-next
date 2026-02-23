import {Alert, Box, Divider, Grid, Stack} from "@mui/material";
import Cards from "../../../components/catalog/Cards";
import PageContainer from "../../../components/container/PageContainer";
import {apiClient} from "../../../lib/api/client";
import {API_ENDPOINTS} from "../../../lib/api/endpoints";
import {Suspense} from 'react';
import {LoadingFallback} from "../../../components/common/LoadingFallback";
import AppPagination from "../../../components/common/Pagination";
import {PaginatedResult} from "../../../dtos/paginated-result.dto";
import {FlowerDto} from "../../../dtos/flower.dto";

// Кэшируем данные для SEO
export const revalidate = 3600; // 1 час

export const metadata = {
    title: 'Каталог цветов',
    description: 'На странице представлен каталог клумбовых цветов компании',
};

interface CatalogPageProps {
    searchParams: Promise<{
        ['page']?: string;
        ['limit']?: string;
    }>;
}

async function getFlowersData(params: any): Promise<PaginatedResult<FlowerDto>> {
    try {
        const data = await apiClient.get<PaginatedResult<FlowerDto>>(API_ENDPOINTS.FLOWERS.LIST, params);
        return data;
    } catch (error) {
        console.error('Failed to fetch flowers:', error);
        throw error;
    }
}

const CatalogPage = async ({searchParams}: CatalogPageProps) => {

    const params = await searchParams;

    // Преобразуем параметры
    const apiParams = {
        page: params['page'] || '0',
        limit: params['limit'] || '12',
    };

    return (
        <PageContainer {...metadata}>
            {/* SEO-контент (скрытый) */}
            <div style={{display: 'none'}}>
                <h1>Каталог цветов и растений</h1>
                <p>Магазин клумбовых цветов с доставкой. Широкий ассортимент цветов для клумб и кашпо. Ампельные и
                    кустовые цветы для озеленения территорий домов, офисов, школ, детских садиков и городских
                    территорий.</p>
            </div>

            {/* Карточки товаров с Suspense для загрузки */}
            <Suspense fallback={<LoadingFallback/>}>
                <FlowerCardsWrapper params={apiParams}/>
            </Suspense>
        </PageContainer>
    );
};

// Компонент-обертка для получения данных
async function FlowerCardsWrapper({params}: { params: any }) {
    try {
        const flowersData = await getFlowersData(params);

        const page = flowersData.pagination.page;
        const limit = flowersData.pagination.limit;
        const total = flowersData.pagination.total;
        const totalPages = flowersData.pagination.totalPages;

        return (
            <Stack spacing={4}>
                {/*Тут разместим блок с сортировкой и фильтрами*/}
                <Box>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            {!flowersData.data.length && (
                                <div>😞 По вашему запросу товаров не найдено</div>
                            )}
                            <Cards flowers={flowersData.data} isAdmin={false}/>
                        </Grid>
                    </Grid>
                </Box>
                <Divider/>
                <AppPagination
                    page={page}
                    totalPages={totalPages}
                    limit={limit}
                    total={total}
                />
            </Stack>
        );
    } catch (error) {
        return (
            <Alert severity="error" sx={{mt: 2}}>
                Не удалось загрузить каталог цветов. Пожалуйста, попробуйте позже.
            </Alert>
        );
    }
}

export default CatalogPage;