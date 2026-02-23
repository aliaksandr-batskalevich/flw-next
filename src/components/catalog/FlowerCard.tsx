import {Box, Card, CardContent, Chip, Divider, Grid, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import CardAvatar from "./CardAvatar";
import FlowerDetails from "./FlowerDetails";
import {getFlowerColor} from "../../utils/color.util";
import {FlowerDto} from '../../dtos/flower.dto';
import AddFlowerButtonWrapper from "./AddFlowerButtonWrapper";

interface CardProps {
    flower: FlowerDto;
    isAdmin: boolean;
}

const FlowerCard = ({flower, isAdmin}: CardProps) => {

    let nameText: string = flower.name;
    if (flower.subName) nameText += ` ${flower.subName}`;

    let colorText: string = getFlowerColor(flower.color);
    if (flower.colorDescription) colorText += ` (${flower.colorDescription})`;

    return (
        <Grid
            size={{
                xs: 12,
                md: 4,
                lg: 3,
            }}
        >
            <Card
                sx={{p: 0, position: "relative"}}
                elevation={9}
                variant={undefined}
            >
                {isAdmin && (
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 1}}>
                        <AddFlowerButtonWrapper editableFLower={flower}/>
                    </Box>
                )}
                {/* Контейнер для ярлыков */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    {/* ХИТ СЕЗОНА */}
                    {flower.isHit && (
                        <Chip
                            label="ХИТ СЕЗОНА"
                            size="small"
                            sx={{
                                bgcolor: 'error.main',
                                color: 'error.contrastText',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                height: 24,
                                boxShadow: 2,
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                    '0%': {transform: 'scale(1)'},
                                    '50%': {transform: 'scale(1.05)'},
                                    '100%': {transform: 'scale(1)'},
                                },
                            }}
                        />
                    )}

                    {/* РАСПРОДАЖА */}
                    {flower.isSale && (
                        <Chip
                            label="РАСПРОДАЖА"
                            size="small"
                            sx={{
                                bgcolor: 'success.main',
                                color: 'success.contrastText',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                height: 24,
                                boxShadow: 2,
                                animation: 'pulse 2s infinite',
                                animationDelay: '0.5s',
                            }}
                        />
                    )}

                    {/* ОСТАЛОСЬ МАЛО */}
                    {flower.isLittleLeft && (
                        <Chip
                            label="ОСТАЛОСЬ МАЛО"
                            size="small"
                            sx={{
                                bgcolor: 'warning.main',
                                color: 'warning.contrastText',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                height: 24,
                                boxShadow: 2,
                                animation: 'pulse 2s infinite',
                                animationDelay: '1s',
                            }}
                        />
                    )}
                </Box>
                <CardAvatar src={flower.smallPhoto}/>
                <CardContent sx={{p: 3, pt: 2}}>
                    <Typography style={{minHeight: '38px'}} variant="h6">{nameText}</Typography>
                    <Typography variant="body2">{colorText}</Typography>
                    <Divider style={{
                        marginTop: "5px",
                    }}/>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Stack direction="row" alignItems="center">
                            <Typography variant="h6">{`${flower.price} руб.`}</Typography>
                        </Stack>
                        <FlowerDetails id={flower.id}/>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default FlowerCard;