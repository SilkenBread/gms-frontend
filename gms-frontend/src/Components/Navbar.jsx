import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from "/remastered.webp"
import { logout } from './auth';

const pages = ['Servicios', 'Horarios', 'Ubicación'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleLogin = () => {
        navigate("/login")
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ display: { xs: 'none', md: 'flex' }, height: 40, mr: 1 }}
                />
            
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#ffd303',
                            textDecoration: 'none',
                        }}
                    >
                        GEMELOS GYM
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{ display: { xs: 'flex', md: 'none' }, height: 40, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#ffd303',
                            textDecoration: 'none',
                        }}
                    >
                        GEMELOS GYM
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            startIcon={<LoginIcon />}
                            sx={{
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                borderRadius: '50px', 
                                textTransform: 'none', 
                                paddingX: 3,
                                paddingY: 1,
                                '&:hover': {
                                    backgroundColor: '#f0f0f0', 
                                }
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            onClick={() => logout(navigate)}
                            variant="contained"
                            color="error"
                            sx={{ marginLeft: 'auto' }}
                        >
                            Cerrar sesión
                        </Button>


                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
