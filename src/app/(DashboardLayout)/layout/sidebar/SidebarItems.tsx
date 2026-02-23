import React from "react";
import Menuitems from "./MenuItems";
import {Box, Divider, useMediaQuery} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import {Menu, MenuItem, Sidebar as MUI_Sidebar, Submenu,} from "react-mui-sidebar";
import {IconPoint} from '@tabler/icons-react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {customColors} from "../../../../utils/theme";
import Logo from "../../../../components/common/Logo";

const renderMenuItems = (items: any, pathDirect: any) => {

    return items.map((item: any) => {

        const Icon = item.icon ? item.icon : IconPoint;

        const itemIcon = <Icon stroke={1.5} size="1.3rem"/>;

        if (item.subheader) {
            // Display Subheader
            return (
                <Menu
                    subHeading={item.subheader}
                    key={item.subheader}
                />
            );
        }

        //If the item has children (submenu)
        if (item.children) {
            return (
                <Submenu
                    key={item.id}
                    title={item.title}
                    icon={itemIcon}
                    borderRadius='7px'
                >
                    {renderMenuItems(item.children, pathDirect)}
                </Submenu>
            );
        }

        // If the item has no children, render a MenuItem

        return (
            <Box px={3} key={item.id}>
                <MenuItem
                    key={item.id}
                    isSelected={pathDirect === item?.href}
                    borderRadius='8px'
                    icon={itemIcon}
                    link={item.href}
                    component={Link}
                >
                    {item.title}
                </MenuItem>
            </Box>

        );
    });
};


const SidebarItems = () => {
    const pathname = usePathname();
    const pathDirect = pathname;
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <MUI_Sidebar
            width={"100%"}
            showProfile={false}
            themeColor={customColors.primary}
            themeSecondaryColor={'#49beff'}
        >
            {lgUp && <Logo />}
            <Divider/>
            {renderMenuItems(Menuitems, pathDirect)}
        </MUI_Sidebar>
    );
};
export default SidebarItems;
