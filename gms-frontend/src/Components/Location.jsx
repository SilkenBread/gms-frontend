import { Box, Container, Typography } from "@mui/material";

const Location = () => (
    <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>Ubicación</Typography>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nos encontramos en el corazón de la ciudad.</Typography>
        <Box mt={3}>
            <iframe
                title="Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497.840194355424!2d-76.4966187!3d3.4178712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a72402f406fb%3A0xf7e783608128029b!2sGemelos%20Gym!5e0!3m2!1ses!2sco!4v1746505399839!5m2!1ses!2sco"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </Box>
    </Container>
);

export default Location;