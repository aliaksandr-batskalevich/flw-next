'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {Box, MenuItem, Pagination, Select, SelectChangeEvent, Stack} from "@mui/material";
import {customColors} from "../../utils/theme";
import {ChangeEvent} from "react";

interface AppPaginationProps {
    page: number;
    limit: number;
    total: number
    totalPages: number;
}


const AppPagination = (props: AppPaginationProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Функция для обновления URL параметров
    const updateSearchParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.push(`${pathname}?${params.toString()}`);
    };

    const handlePaginationChange = (event: ChangeEvent<unknown>, value: number) => {
        updateSearchParams({ page: (value - 1).toString() });
    };

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        const newValue = Number(event.target.value);
        updateSearchParams({
            ['total']: newValue.toString(),
            page: '0', // Сбрасываем на первую страницу
        });
    };

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
        >
            {/* Селектор количества */}
            <Stack direction="row" spacing={2} alignItems="center">
                <Select
                    size="small"
                    value={props.limit}
                    onChange={handleLimitChange}
                    sx={{
                        minWidth: 100,
                        // Стили для селекта
                        '& .MuiSelect-select': {
                            color: customColors.text,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: customColors.border,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: customColors.primary,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: customColors.primary,
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                // Стили для развернутого меню
                                '& .MuiMenuItem-root': {
                                    color: customColors.text,
                                    '&:hover': {
                                        backgroundColor: customColors.primaryLight,
                                    },
                                    // Стиль для выбранного пункта в меню
                                    '&.Mui-selected': {
                                        backgroundColor: customColors.primaryLight,
                                        color: customColors.primaryDark,
                                        fontWeight: 'bold',
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: customColors.primaryLight,
                                    },
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value={12}>12 на странице</MenuItem>
                    <MenuItem value={24}>24 на странице</MenuItem>
                    <MenuItem value={48}>48 на странице</MenuItem>
                </Select>

                <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    <span>{`из ${props.total} товаров`}</span>
                </Box>
            </Stack>

            {/* Пагинация */}
            <Pagination
                count={Number(props.totalPages)}
                page={Number(props.page) + 1}
                onChange={handlePaginationChange}
                size="medium"
                shape="rounded"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: customColors.text,
                        '&:hover': {
                            backgroundColor: customColors.primaryLight,
                        },
                        // Стиль для текущей страницы
                        '&.Mui-selected': {
                            backgroundColor: customColors.primary,
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: customColors.primaryDark,
                            },
                        },
                    },
                }}
            />

            {/* Номера страниц */}
            <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                Страница <strong>{Number(props.page) + 1}</strong> из <strong>{props.totalPages}</strong>
            </Box>
        </Stack>
    );
};

export default AppPagination;