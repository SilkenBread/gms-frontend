import React from 'react';
import { Box, Typography } from '@mui/material';
import image from '../assets/imgs/main.jpg';

const BackgroundImage = () => {
    return (
        <Box
            sx={{
                height: '90vh',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                px: 2,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1,
                }}
            />

            {/* Contenido */}
            <Box sx={{ zIndex: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    <Box component="span" sx={{ color: '#ffd303' }}>GEMELOS</Box> GYM
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    La diferencia entre quién eres y quién quieres ser es aquello que haces
                </Typography>

            </Box>
        </Box>
    );
};

export default BackgroundImage;
