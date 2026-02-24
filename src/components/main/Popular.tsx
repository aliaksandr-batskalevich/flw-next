import React, {Suspense} from 'react';
import {Alert, Box, Container, Grid, Stack, Typography} from "@mui/material";
import {PaginatedResult} from "../../dtos/paginated-result.dto";
import {FlowerDto} from "../../dtos/flower.dto";
import {apiClient} from "../../lib/api/client";
import {API_ENDPOINTS} from "../../lib/api/endpoints";
import {LoadingFallback} from "../common/LoadingFallback";
import Cards from "../catalog/Cards";
import CatalogLink from "./CatalogLink";

async function getFlowersData(params: any = {}): Promise<PaginatedResult<FlowerDto>> {
    try {
        const data = await apiClient.get<PaginatedResult<FlowerDto>>(API_ENDPOINTS.FLOWERS.LIST, params);
        return data;
    } catch (error) {
        console.error('Failed to fetch flowers:', error);
        throw error;
    }
}

const Popular = () => {
    return (
        <Container sx={{py: 8, paddingBottom: 0}}>
            <Typography variant="h3" align="center" gutterBottom>
                Лучшее предложение
            </Typography>
            <Suspense fallback={<LoadingFallback/>}>
                <FlowerCardsWrapper params={{page: 0, limit: 4, hit: true}}/>
            </Suspense>
            <Box sx={{paddingTop: '20px'}}>
                <CatalogLink/>
            </Box>
        </Container>
    );
};

// Компонент-обертка для получения данных
async function FlowerCardsWrapper({params}: { params: any }) {
    try {
        const flowersData = await getFlowersData(params);

        return (
            <Stack spacing={4}>
                <Box>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            {!flowersData.data.length && (
                                <div>😞 Нет товаров</div>
                            )}
                            <Cards flowers={flowersData.data} isAdmin={false}/>
                        </Grid>
                    </Grid>
                </Box>
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

export default Popular;