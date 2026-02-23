import React from 'react';
import {AppBar, Box, Divider, IconButton, styled, Toolbar, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import PropTypes from 'prop-types';
import {IconMenu} from '@tabler/icons-react';
import Logo from "../../../../components/common/Logo";
import Slogan from "./Slogan";
import ContactPhone from "./ContactPhone";

export interface ItemType {
    toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {

    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));


    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled sx={{display: "flex"}}>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleMobileSidebar}
                    sx={{
                        display: {
                            lg: "none",
                            xs: "inline",
                        },
                    }}
                >
                    <IconMenu width="20" height="20" />
                </IconButton>
                <Box sx={{flexGrow: 1, display: 'flex', justifyContent: "space-between" }}>
                    {lgUp ? <Slogan/> : <Logo/>}
                    <ContactPhone/>
                </Box>
            </ToolbarStyled>
            <Divider/>
        </AppBarStyled>
    );
};

Header.propTypes = {
    sx: PropTypes.object,
};

export default Header;
