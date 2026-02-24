'use client';

import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

interface Post {
    id: string;
    title: string;
    image: string;
    text: string;
    link?: string;
    createdAt: Date;
}

const posts: Post[] = [
    {
        id: 'string1',
        title: 'Стартовал прием заказов на 2026 год.',
        text: 'Принимаем заказы на 2026 год. Успейте заказать наши новинки. Подробности в каталоге. Хорошего всем настроения!!!',
        image: '/uploads/posts/1.jpg',
        link: '/catalog',
        createdAt: new Date('02/21/2026'),
    }
];

const Post = ({ post }: { post: Post }) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card
            sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'row', // всегда горизонтально
                width: '100%',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            {/* Изображение слева с фиксированными размерами */}
            <CardMedia
                component="img"
                sx={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    display: { xs: 'none', sm: 'block' }, // скрываем на xs
                }}
                image={post.image}
                alt={post.title}
            />

            {/* Правая часть с контентом */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, pl: 2 }}>
                <CardContent sx={{ flex: '1 1 auto', p: 0 }}>
                    <Typography variant="h6" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {post.text.length > 150 ? `${post.text.slice(0, 150)}...` : post.text}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', textAlign: 'left' }}
                    >
                        {formattedDate}
                    </Typography>
                </CardContent>

                {post.link && (
                    <CardActions sx={{ justifyContent: 'flex-end', p: 0 }}>
                        <Button size="small" color="primary" href={post.link}>
                            Перейти
                        </Button>
                    </CardActions>
                )}
            </Box>
        </Card>
    );
};

const Blog = () => {
    return (
        <Container sx={{ py: 8, pb: 0 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Новости из теплицы
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid key={post.id} size={{ xs: 12 }}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Blog;