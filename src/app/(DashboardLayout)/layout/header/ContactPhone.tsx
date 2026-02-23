'use client';

import { useMediaQuery, Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CallIcon from '@mui/icons-material/Call';
import Link from 'next/link';
import {customColors} from "../../../../utils/theme";

interface ContactPhoneProps {
    phoneNumber?: string;      // номер в международном формате для ссылки
    displayPhone?: string;     // номер для отображения
    managerName?: string;      // имя менеджера
}

export default function ContactPhone({
                                         phoneNumber = '+375292777572',
                                         displayPhone = '+375 29 277 75 72',
                                         managerName = 'Мария',
                                     }: ContactPhoneProps) {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

    if (lgUp) {
        // Десктопная версия: номер + имя
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link href={`tel:${phoneNumber}`} style={{ textDecoration: 'none', color: customColors.primary}}>
                    <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
                        {displayPhone}
                    </Typography>
                </Link>
                <Typography variant="h6" sx={{ color: customColors.primary }}>
                    ({managerName})
                </Typography>
            </Box>
        );
    }

    // Мобильная версия: иконка телефона
    return (
        <IconButton
            component="a"
            href={`tel:${phoneNumber}`}
            color="inherit"
            sx={{ ml: 'auto' }}
        >
            <CallIcon fontSize="large" sx={{color: customColors.primary}}/>
        </IconButton>
    );
}