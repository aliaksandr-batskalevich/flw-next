import Link from "next/link";
import {Box} from "@mui/material";

const Logo = () => {
    return (
        <Box style={{paddingLeft: "20px", height: "66px", display: "flex", alignItems: "center"}}>
            <Link href='/'>
                <img style={{height: '50px'}} src={'/images/logos/logo-flw.png'} alt='logo'/>
            </Link>
        </Box>
    );
};

export default Logo;