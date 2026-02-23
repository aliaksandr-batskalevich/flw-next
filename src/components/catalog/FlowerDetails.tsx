'use client'
import {Button} from "@mui/material";
import Link from "next/link";

interface FLowerDetailsProps {
    id: string;
}

const FlowerDetails = ({id}: FLowerDetailsProps) => {

    return (
        <Button
            variant="contained"
            component={Link}
            href={`/catalog/${id}`}
            disableElevation
            color="primary"
        >
            Детали
        </Button>
    );
};

export default FlowerDetails;