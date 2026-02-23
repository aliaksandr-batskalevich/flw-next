import {Avatar} from "@mui/material";

interface CardAvatarProps {
    src: string;
}

const CardAvatar = ({src}: CardAvatarProps) => {

    return (
        <Avatar
            src={src}
            variant="square"
            sx={{
                height: 250,
                width: "100%",
            }}
        />
    );
};

export default CardAvatar;