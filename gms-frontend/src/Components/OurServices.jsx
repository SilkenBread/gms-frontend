import backgroundImage from '../assets/imgs/main.jpg';
import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    useTheme
} from "@mui/material";
const trainingData = [
    {
        title: "CARDIO STRENGTH",
        description: "It is a long established fact that it will be distracted...",
        image: backgroundImage,
    },
    {
        title: "WEIGHT LIFTING",
        description: "It is a long established fact that it will be distracted...",
        image: backgroundImage,
    },
    {
        title: "BODY BALANCE",
        description: "It is a long established fact that it will be distracted...",
        image: backgroundImage,
    },
    {
        title: "MUSCLE STRETCHING",
        description: "It is a long established fact that it will be distracted...",
        image: backgroundImage,
    },
    {
        title: "BASIC YOGA",
        description: "It is a long established fact that it will be distracted...",
        image: backgroundImage,
    },
    {
        title: "BEGINNER PILATES",
        description: "It is a long established fact that it will be distracted...",
        image: backgroundImage,
    },
];

const OurServices = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: "#1a1a1a",
                color: "#fff",
                py: 8,
                px: 3,
                textAlign: "center",
            }}
        >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                NUESTROS SERVICIOS
            </Typography>

            <Grid container spacing={4} justifyContent="center" mt={4}>
                {trainingData.map((training, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                backgroundColor: "#2a2a2a",
                                color: "#fff",
                                borderRadius: 2,
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={training.image}
                                alt={training.title}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {training.title}
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    {training.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OurServices;