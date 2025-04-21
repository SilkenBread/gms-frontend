import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const schedules = {
    daily: [
        {
            title: "Morning",
            time: "6:00 AM - 9:00 AM",
            details: ["Cardio Classes", "Yoga", "Stretching"],
            color: "#1f1f1f",
        },
        {
            title: "Afternoon",
            time: "12:00 PM - 3:00 PM",
            details: ["Strength Training", "Zumba", "Pilates"],
            color: "#ffd303",
        },
        {
            title: "Evening",
            time: "5:00 PM - 8:00 PM",
            details: ["HIIT", "Group Training", "Meditation"],
            color: "#1f1f1f",
        },
    ],
    weekend: [
        {
            title: "Saturday Special",
            time: "8:00 AM - 12:00 PM",
            details: ["Full Body Workout", "Functional Training"],
            color: "#1f1f1f",
        },
        {
            title: "Sunday Zen",
            time: "10:00 AM - 1:00 PM",
            details: ["Relaxing Yoga", "Breathing Techniques"],
            color: "#ffd303",
        },
        {
            title: "Evening Flow",
            time: "4:00 PM - 6:00 PM",
            details: ["Stretching", "Mobility", "Pilates"],
            color: "#1f1f1f",
        },
    ],
};

const Schedule = () => {
    const [mode, setMode] = useState("daily");

    const handleChange = (event, newMode) => {
        if (newMode !== null) setMode(newMode);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#2b2b2b",
                color: "#fff",
                py: 8,
                px: 3,
                textAlign: "center",
            }}
        >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                HORARIOS
            </Typography>

            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleChange}
                sx={{
                    backgroundColor: "#3a3a3a",
                    borderRadius: "30px",
                    mt: 2,
                    mb: 5,
                }}
            >
                <ToggleButton
                    value="daily"
                    sx={{
                        color: "#fff",
                        "&.Mui-selected": {
                            backgroundColor: "#ffd303",
                            color: "#fff",
                        },
                        border: "none",
                        borderRadius: "30px",
                        px: 4,
                    }}
                >
                    Daily
                </ToggleButton>
                <ToggleButton
                    value="weekend"
                    sx={{
                        color: "#fff",
                        "&.Mui-selected": {
                            backgroundColor: "#ffd303",
                            color: "#fff",
                        },
                        border: "none",
                        borderRadius: "30px",
                        px: 4,
                    }}
                >
                    Weekend
                </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={4} justifyContent="center">
                {schedules[mode].map((slot, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                backgroundColor: slot.color,
                                borderRadius: 3,
                                height: "100%",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {slot.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {slot.time}
                                </Typography>
                                <List>
                                    {slot.details.map((item, idx) => (
                                        <ListItem key={idx} sx={{ px: 0 }}>
                                            <ListItemIcon>
                                                <CheckIcon sx={{ color: "#ff6a00" }} />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Schedule;
