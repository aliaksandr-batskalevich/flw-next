'use client';

import { Container, Paper, Typography, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GrassIcon from '@mui/icons-material/Grass';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const advantages = [
    {
        icon: <GrassIcon fontSize="large" />,
        title: 'Собственная продукция',
        description: 'Мы гарантируем качество нашей рассады',
    },
    {
        icon: <LocalShippingIcon fontSize="large" />,
        title: 'Бережная доставка',
        description: 'Осуществляем своевременную доставку собственным транспортом',
    },
    {
        icon: <SupportAgentIcon fontSize="large" />,
        title: 'Консультация',
        description: 'Поможем выбрать идеальное решение',
    },
    {
        icon: <ThumbUpIcon fontSize="large" />,
        title: ':)',
        description: 'Привозим хорошее настроение',
    },
];

export default function AdvantagesSection() {
    return (
        <Container sx={{ py: 8, paddingBottom: 0 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Почему выбирают нас
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr 1fr',
                    },
                    gap: 4,
                    mt: 2,
                }}
            >
                {advantages.map((item, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '100%', // важно для grid
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <Box sx={{ color: 'primary.main', mb: 2 }}>{item.icon}</Box>
                        <Typography variant="h6" gutterBottom>
                            {item.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {item.description}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}