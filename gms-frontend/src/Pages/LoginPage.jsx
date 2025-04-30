import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import ResponsiveAppBar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';


//provisional dictionary
const users = [
    { email: 'admin@correo.com', password: 'admin123', rol: 'admin' },
    { email: 'recepcionista@correo.com', password: 'recepcion123', rol: 'recepcion' },
    { email: 'entrenador@correo.com', password: 'entrena123', rol: 'entrenador' },
    { email: 'trabajador@correo.com', password: 'trabaja123', rol: 'trabajador' }
];

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setLoginError('');
    
        if (!validateEmail(email)) {
            setEmailError('Correo electrónico inválido.');
            return;
        }
    
        if (password.trim() === '') {
            setPasswordError('La contraseña no puede estar vacía.');
            return;
        }
    
        
        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Error de autenticación');
            }
    
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));

            console.log('Usuario guardado en localStorage:', localStorage.getItem('user'));


            if (user && user.user_type) {
                switch (user.user_type) {
                    case 'employee':
                        navigate('/admin'); 
                        break;
                    case 'Member':
                        navigate('/'); 
                        break;
                    default:
                        console.log('Bienvenido');
                        navigate('/'); 
                        break;
                }
            } else {
                console.log("Error: No se pudo obtener el tipo de usuario.");
            }
            
        } catch (error) {
           setLoginError(error.message);
        }

        /*
        provisional dictionary
        
        let isValid = true;
        
        if (isValid) {
            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                switch (user.rol) {
                    case 'admin':
                        navigate("/admin")
                        break;
                    case 'recepcion':
                        navigate("/recepcionist")
                        break;
                    case 'entrenador':
                        navigate("/trainer")
                        break;
                    case 'trabajador':
                        navigate("/worker")
                        break;
                    default:
                        console.log("Bienvenido")
                        break;
                }
            } else {
                setLoginError('Correo o contraseña incorrectos.');
            }
        }
        */
        
    };


    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            required
                        />
                        {loginError && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {loginError}
                            </Typography>
                        )}
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: '#ffd303',
                                color: '#fff',
                                borderRadius: '50px',
                                '&:hover': {
                                    backgroundColor: '#333',
                                },
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default LoginPage;
