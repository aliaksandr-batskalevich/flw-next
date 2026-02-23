'use client';

import { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Stack,
    Select,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import { useRouter } from 'next/navigation';
import { getFlowerColorOptions } from '../../utils/color.util';
import { getFlowerTypeOptions } from '../../utils/flower-type.util';
import { getFlowerCategoryOptions } from '../../utils/flower-category.util';
import { SelectChangeEvent } from '@mui/material/Select';
import { FlowerDto } from '../../dtos/flower.dto';

export interface AddFlowerButtonProps {
    editableFLower?: FlowerDto; // если передан — режим редактирования
    onFlowerAdded?: () => void;  // callback после успешного добавления/обновления
}

export default function AddFlowerButton({ editableFLower, onFlowerAdded }: AddFlowerButtonProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [smallPhotoFile, setSmallPhotoFile] = useState<File | null>(null);
    const [largePhotoFile, setLargePhotoFile] = useState<File | null>(null);
    const [smallPhotoPreview, setSmallPhotoPreview] = useState<string | null>(null);
    const [largePhotoPreview, setLargePhotoPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Состояния формы
    const [formData, setFormData] = useState({
        name: '',
        subName: '',
        color: '',
        colorDescription: '',
        type: '',
        category: '',
        price: 0,
        isSale: false,
        isHit: false,
        isLittleLeft: false,
        smallPhoto: '',
        largePhoto: '',
    });

    const isEditing = !!editableFLower;

    // Сброс формы к исходному состоянию (пустому или к данным редактирования)
    const resetForm = () => {
        if (isEditing && editableFLower) {
            setFormData({
                name: editableFLower.name || '',
                subName: editableFLower.subName || '',
                color: editableFLower.color || '',
                colorDescription: editableFLower.colorDescription || '',
                type: editableFLower.type || '',
                category: editableFLower.category || '',
                price: editableFLower.price || 0,
                isSale: editableFLower.isSale || false,
                isHit: editableFLower.isHit || false,
                isLittleLeft: editableFLower.isLittleLeft || false,
                smallPhoto: editableFLower.smallPhoto || '',
                largePhoto: editableFLower.largePhoto || '',
            });
            setSmallPhotoPreview(editableFLower.smallPhoto || null);
            setLargePhotoPreview(editableFLower.largePhoto || null);
        } else {
            setFormData({
                name: '',
                subName: '',
                color: '',
                colorDescription: '',
                type: '',
                category: '',
                price: 0,
                isSale: false,
                isHit: false,
                isLittleLeft: false,
                smallPhoto: '',
                largePhoto: '',
            });
            setSmallPhotoPreview(null);
            setLargePhotoPreview(null);
        }
        setSmallPhotoFile(null);
        setLargePhotoFile(null);
        setError(null);
    };

    // При открытии модалки заполняем форму (если редактирование)
    useEffect(() => {
        if (open) {
            resetForm();
        }
    }, [open, editableFLower]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSmallPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSmallPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSmallPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLargePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLargePhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLargePhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let smallPhotoUrl = formData.smallPhoto;
            let largePhotoUrl = formData.largePhoto;

            // Загружаем новые фото, если они выбраны
            if (smallPhotoFile) {
                setIsUploading(true);
                const smallFormData = new FormData();
                smallFormData.append('file', smallPhotoFile);
                const resSmall = await fetch('/api/upload', {
                    method: 'POST',
                    body: smallFormData,
                });
                if (!resSmall.ok) {
                    const err = await resSmall.json();
                    throw new Error(err.error || 'Ошибка загрузки маленького фото');
                }
                const { url: smallUrl } = await resSmall.json();
                smallPhotoUrl = smallUrl;
            }

            if (largePhotoFile) {
                setIsUploading(true);
                const largeFormData = new FormData();
                largeFormData.append('file', largePhotoFile);
                const resLarge = await fetch('/api/upload', {
                    method: 'POST',
                    body: largeFormData,
                });
                if (!resLarge.ok) {
                    const err = await resLarge.json();
                    throw new Error(err.error || 'Ошибка загрузки большого фото');
                }
                const { url: largeUrl } = await resLarge.json();
                largePhotoUrl = largeUrl;
            }

            // Проверка, что фото получены (только для создания, при редактировании они уже есть)
            if (!isEditing && (!smallPhotoUrl || !largePhotoUrl)) {
                throw new Error('Необходимо загрузить оба фото');
            }

            // Определяем метод и URL
            const url = isEditing ? `/api/flowers/${editableFLower!.id}` : '/api/flowers';
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(String(formData.price)),
                    smallPhoto: smallPhotoUrl,
                    largePhoto: largePhotoUrl,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Ошибка при сохранении товара');
            }

            // Успех
            handleClose();
            if (onFlowerAdded) onFlowerAdded();
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setIsUploading(false);
        }
    };

    return (
        <>
            {isEditing ? (
                <IconButton color="primary" onClick={() => setOpen(true)}>
                    <SettingsIcon />
                </IconButton>
            ) : (
                <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
                    + Добавить товар
                </Button>
            )}

            <CModal
                alignment="center"
                scrollable
                visible={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <CModalHeader>
                    <CModalTitle id="modal-title">
                        {isEditing ? 'Редактировать товар' : 'Новый товар'}
                    </CModalTitle>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                </CModalHeader>
                <CModalBody>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Название"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Подзаголовок"
                                name="subName"
                                value={formData.subName}
                                onChange={handleChange}
                                fullWidth
                            />
                            {/* Цвет */}
                            <FormControl fullWidth required>
                                <InputLabel id="color-label">Цвет</InputLabel>
                                <Select
                                    labelId="color-label"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleSelectChange}
                                    label="Цвет"
                                >
                                    {getFlowerColorOptions().map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Описание цвета"
                                name="colorDescription"
                                value={formData.colorDescription}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={2}
                            />
                            <FormControl fullWidth required>
                                <InputLabel id="type-label">Тип</InputLabel>
                                <Select
                                    labelId="type-label"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleSelectChange}
                                    label="Тип"
                                >
                                    {getFlowerTypeOptions().map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel id="category-label">Категория</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleSelectChange}
                                    label="Категория"
                                >
                                    {getFlowerCategoryOptions().map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Цена"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                fullWidth
                                inputProps={{ min: 0, step: 0.01 }}
                            />

                            <Stack spacing={2}>
                                {/* Маленькое фото */}
                                <FormControl fullWidth>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{ mb: 1 }}
                                        disabled={isUploading}
                                    >
                                        {isEditing ? 'Заменить маленькое фото' : 'Выбрать маленькое фото'}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleSmallPhotoChange}
                                        />
                                    </Button>
                                    {smallPhotoPreview && (
                                        <Box sx={{ position: 'relative', width: 100, height: 100, mb: 2 }}>
                                            <img
                                                src={smallPhotoPreview}
                                                alt="Preview small"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <IconButton
                                                size="small"
                                                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'white' }}
                                                onClick={() => {
                                                    setSmallPhotoFile(null);
                                                    setSmallPhotoPreview(isEditing ? formData.smallPhoto || null : null);
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </FormControl>

                                {/* Большое фото */}
                                <FormControl fullWidth>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{ mb: 1 }}
                                        disabled={isUploading}
                                    >
                                        {isEditing ? 'Заменить большое фото' : 'Выбрать большое фото'}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleLargePhotoChange}
                                        />
                                    </Button>
                                    {largePhotoPreview && (
                                        <Box sx={{ position: 'relative', width: 100, height: 100, mb: 2 }}>
                                            <img
                                                src={largePhotoPreview}
                                                alt="Preview large"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <IconButton
                                                size="small"
                                                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'white' }}
                                                onClick={() => {
                                                    setLargePhotoFile(null);
                                                    setLargePhotoPreview(isEditing ? formData.largePhoto || null : null);
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </FormControl>
                            </Stack>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isSale"
                                        checked={formData.isSale}
                                        onChange={handleChange}
                                    />
                                }
                                label="Распродажа"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isHit"
                                        checked={formData.isHit}
                                        onChange={handleChange}
                                    />
                                }
                                label="Хит продаж"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isLittleLeft"
                                        checked={formData.isLittleLeft}
                                        onChange={handleChange}
                                    />
                                }
                                label="Мало осталось"
                            />

                            <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
                                {loading ? <CircularProgress size={24} /> : isEditing ? 'Сохранить' : 'Создать'}
                            </Button>
                        </Stack>
                    </form>
                </CModalBody>
            </CModal>
        </>
    );
}