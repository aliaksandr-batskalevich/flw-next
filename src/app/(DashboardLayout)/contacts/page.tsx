import PageContainer from "../../../components/container/PageContainer";
import {Box, Container, Divider, Link, Typography} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export const revalidate = 3600;

export const metadata = {
    title: 'Контакты оптовая продажа цветов',
    description: 'Контакты. Оптовая продажа клумбовых цветов. Цветы в кашпо. Цветы в вазоны. Цветы в вазы. Цветы г. Минск. Цветы г. Брест. Цветы г. Ивацевичи. Цветы г. Пинск.',
};
const contactsData = {
    address: 'Республика Беларусь, Брестская область,\nг. Ивацевичи, ул. Славянская, 17',
    tel: '+375 29 277 75 72',
    email: 'flw2777572@gmail.com',
};

const ContactsPage = () => {
    return (
        <PageContainer {...metadata}>
            {/* Скрытый SEO-текст */}
            <div style={{display: 'none'}}>
                <h1>Контакты компании по оптовой продаже цветов</h1>
                <p>Магазин клумбовых цветов с доставкой. Широкий ассортимент цветов для клумб и кашпо. Ампельные и
                    кустовые цветы для озеленения территорий домов, офисов, школ, детских садиков и городских
                    территорий. Цветы в г. Минск. Цветы в г. Брест. Цветы в г. Пинск. Цветы в г. Ивацевичи.</p>
            </div>

            <Container maxWidth="md" sx={{
                py: 8,
                margin: 0,
                padding: 0,
            }}>
                {/* Заголовок слева */}
                <Typography variant="h3" align="left" gutterBottom>
                    Контакты
                </Typography>

                <Box sx={{mt: 4}}>
                    {/* Адрес */}
                    <Box display="flex" alignItems="flex-start" gap={2} sx={{py: 3}}>
                        <LocationOnIcon color="primary" sx={{fontSize: 32}}/>
                        <Box>
                            <Typography variant="h6" gutterBottom>Адрес</Typography>
                            <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
                                {contactsData.address}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider/>

                    {/* Телефон */}
                    <Box display="flex" alignItems="flex-start" gap={2} sx={{py: 3}}>
                        <PhoneIcon color="primary" sx={{fontSize: 32}}/>
                        <Box>
                            <Typography variant="h6" gutterBottom>Звоните нам</Typography>
                            <Typography variant="body1">
                                <Link href={'tel:' + contactsData.tel.replaceAll(' ', '')} underline="hover" color="inherit">
                                    {contactsData.tel}
                                </Link>
                            </Typography>
                            <Typography variant="caption" color="text.secondary">Viber/Telegram</Typography>
                        </Box>
                    </Box>

                    <Divider/>

                    {/* Email */}
                    <Box display="flex" alignItems="flex-start" gap={2} sx={{py: 3}}>
                        <EmailIcon color="primary" sx={{fontSize: 32}}/>
                        <Box>
                            <Typography variant="h6" gutterBottom>Пишите нам</Typography>
                            <Typography variant="body1">
                                <Link href={'mailto:' + contactsData.email} underline="hover" color="inherit">
                                    {contactsData.email}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default ContactsPage;