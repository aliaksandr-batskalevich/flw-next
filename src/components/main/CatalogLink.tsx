'use client'
import {Button} from "@mui/material";
import Link from "next/link";
import {customColors} from "../../utils/theme";

const CatalogLink = () => {

    return (
        <Button
            variant="contained"
            component={Link}
            href={`/catalog`}
            disableElevation
            color="primary"
            sx={{
                textTransform: 'none',
                backgroundColor: customColors.primary,
                [":hover"]: {
                    backgroundColor: customColors.primaryLight
                }
            }}
        >
            Еще больше у нас в каталоге
        </Button>
    );
};

export default CatalogLink;