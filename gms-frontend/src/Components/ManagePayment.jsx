import React, { useState, useEffect } from 'react';
import {
    Box, TextField, MenuItem, Button, Typography, Stack, Alert,
    Autocomplete
} from '@mui/material';
import { getMembers } from '../api/members_api';

const ManagePayment = () => {
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        tipoMembresia: '',
        fechaPago: '',
        tipoPago: '',
        valorPagado: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembers();
                const formatted = response.map((entry) => ({
                    cedula: entry.user.id,
                    nombre: entry.user.name,
                    apellido: entry.user.surname,
                }));
                setMembers(formatted);
            } catch (err) {
                console.error("Error cargando miembros:", err);
                setError('No se pudieron cargar los miembros.');
            }
        };
        fetchMembers();
    }, []);

    const handleMemberSelect = (e) => {
        const cedulaSeleccionada = e.target.value;
        const usuario = members.find((m) => m.cedula === cedulaSeleccionada);

        if (usuario) {
            setFormData((prev) => ({
                ...prev,
                cedula: usuario.cedula,
                nombre: `${usuario.nombre} ${usuario.apellido}`,
            }));
            setError('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Enviar formData al backend
    };

    return (
        <Box sx={{ maxWidth: 450, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Registro de Pago
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Autocomplete
                        options={members}
                        getOptionLabel={(option) =>
                            `${option.cedula} - ${option.nombre} ${option.apellido}`
                        }
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setFormData((prev) => ({
                                    ...prev,
                                    cedula: newValue.cedula,
                                    nombre: `${newValue.nombre} ${newValue.apellido}`,
                                }));
                            } else {
                                setFormData((prev) => ({
                                    ...prev,
                                    cedula: '',
                                    nombre: '',
                                }));
                            }
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Seleccionar Miembro" required />
                        )}
                    />

                    <TextField
                        select
                        label="Tipo de Membresía"
                        name="tipoMembresia"
                        value={formData.tipoMembresia}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="mensual">Mensual</MenuItem>
                        <MenuItem value="trimestral">Trimestral</MenuItem>
                        <MenuItem value="anual">Anual</MenuItem>
                    </TextField>

                    <TextField
                        type="date"
                        label="Fecha de Pago"
                        name="fechaPago"
                        value={formData.fechaPago}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />

                    <TextField
                        select
                        label="Tipo de Pago"
                        name="tipoPago"
                        value={formData.tipoPago}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="efectivo">Efectivo</MenuItem>
                        <MenuItem value="transferencia">Transferencia</MenuItem>
                        <MenuItem value="tarjeta">Tarjeta</MenuItem>
                    </TextField>

                    <TextField
                        label="Valor Pagado"
                        name="valorPagado"
                        type="number"
                        value={formData.valorPagado}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit" variant="contained" sx={{background: '#ffd303'}}>
                        Registrar
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ManagePayment;
