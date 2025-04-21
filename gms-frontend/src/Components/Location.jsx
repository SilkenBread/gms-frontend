import { Box, Container, Typography } from "@mui/material";

const Location = () => (
    <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>Ubicación</Typography>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nos encontramos en el corazón de la ciudad.</Typography>
        <Box mt={3}>
            <iframe
                title="Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.8993811698897!2d-76.53696482661948!3d3.3747655517276334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a171d0c4cbb7%3A0x87dfc5d3c72b3ec4!2sUniversidad%20Del%20Valle%2C%20Comuna%2017%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1745208057319!5m2!1ses!2sco"
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