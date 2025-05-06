import { Box, Typography, IconButton, Stack, Divider } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import logo from "/favicon.ico";

const Footer = () => (
    <Box sx={{ bgcolor: '#1a1a1a', py: 4, px: 2, textAlign: 'center' }}>
        <Stack spacing={2} alignItems="center" justifyContent="center">
            {/* Logo */}
            <Box component="img" src={logo} alt="Logo" sx={{ height: 30 }} />

            {/* Redes y contacto */}
            <Stack direction="row" spacing={3} alignItems="center">
                <IconButton
                    component="a"
                    href="https://www.instagram.com/gemelos__gym/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <InstagramIcon sx={{ color: "#ffffff" }} />
                </IconButton>

                <IconButton
                    component="a"
                    href="tel:+573001234567"
                    aria-label="Teléfono"
                >
                    <PhoneIcon sx={{ color: "#ffffff" }} />
                </IconButton>

                <IconButton
                    component="a"
                    href="mailto:contacto@gemelosgym.com"
                    aria-label="Correo electrónico"
                >
                    <EmailIcon sx={{ color: "#ffffff" }} />
                </IconButton>
            </Stack>

            {/* Divider */}
            <Divider sx={{ width: '80%', mt: 1, mb: 1, bgcolor: 'white' }} />

            {/* Derechos reservados */}
            <Typography variant="body2" color="white">
                © 2025 Gemelos Gym. Todos los derechos reservados.
            </Typography>
        </Stack>
    </Box>
);

export default Footer;
