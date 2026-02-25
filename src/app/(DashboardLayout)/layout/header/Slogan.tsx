import { Box } from '@mui/material';
import Image from 'next/image';

const Slogan = () => {
    return (
        <Box>
            <Image
                src="/images/logos/flw-header.png"
                alt="Центр качественной рассады"
                width={494}
                height={50}
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </Box>
    );
};

export default Slogan;