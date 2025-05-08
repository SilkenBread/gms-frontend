import React, { useEffect, useState } from 'react';
import {
    Grid, Typography, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Box,
    Card, CardContent, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addSchedule, addService, deleteSchedule, deleteService, getSchedule, getServices, updateSchedule, updateService } from '../api/landing_api';

export default function ManageLanding() {
    const [horarios, setHorarios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState('');
    const [form, setForm] = useState({});
    const [indexEdit, setIndexEdit] = useState(null);

    const cargar = async () => {
        try {
            const dataServices = await getServices();
            const dataSchedules = await getSchedule();
            setServicios(dataServices)
            setHorarios(dataSchedules)
            console.log(dataSchedules);
        } catch (err) {
            console.log('No se pudieron cargar los miembros');
        }
    };

    useEffect(() => {
        cargar();
    }, []);

    const validarFormulario = () => {
        if (tipo === 'horario') {
            if (!form.categoria || !form.dia || !form.inicio || !form.fin) {
                alert('Todos los campos del horario son obligatorios.');
                return false;
            }
        } else {
            if (!form.nombre || !form.descripcion) {
                alert('Todos los campos del servicio son obligatorios.');
                return false;
            }
        }
        return true;
    };


    const openModal = (tipo, index = null, datos = {}) => {
        console.log(datos)
        setTipo(tipo);
        // Transformar campos según el tipo
        let formateado = {};

        if (tipo === 'servicio') {
            formateado = {
                nombre: datos.name || '',
                descripcion: datos.description || ''
            };
        } else if (tipo === 'horario') {
            formateado = {
                dia: datos.day || '',
                inicio: datos.start_time || '',
                fin: datos.end_time || '',
                categoria: datos.day_category || ''
            };
        }
        setForm(formateado);
        setIndexEdit(index);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setForm({});
        setIndexEdit(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!validarFormulario()) return;

        try {
            let response;
            if (tipo === 'horario') {
                if (indexEdit !== null) {
                    response = await updateSchedule(indexEdit, form);
                } else {
                    response = await addSchedule(form);
                }
            } else {
                if (indexEdit !== null) {
                    response = await updateService(indexEdit, form);
                } else {
                    response = await addService(form);
                }
            }
            window.alert(response.message || 'Guardado correctamente');
            cargar();
            closeModal();
        } catch (error) {
            console.error(error);
            alert('Error al guardar');
        }
    };


    const handleDelete = async (tipo, index) => {
        const isConfirmed = window.confirm("¿Estás seguro de eliminar este horario?");
        if (isConfirmed) {
            let response;
            if (tipo === 'horario') {
                response = await deleteSchedule(index)
            } else {
                response = await deleteService(index);
            }
            window.alert(response.message || 'Eliminación exitosa');
            cargar();
            closeModal();
        }
    };
    

    return (
        <Box sx={{
            height: '100vh',
            p: 4,
            display: 'flex',
            gap: 4,
            flexDirection: { xs: 'column', md: 'row' },
        }}>

            {/* Servicios */}
            <Box sx={{ flex: 1, pr: { md: 2 }, borderRight: { md: '2px solid #ccc' } }}>
                <Box textAlign="center" mb={2}>
                    <Button variant="contained" color="primary" onClick={() => openModal('servicio')}>
                        Agregar servicios
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    {servicios.map((s) => (
                        <Card key={s.service_id} sx={{ mb: 2, width: '100%' }}>
                            <CardContent>
                                <Typography>Titulo: {s.name}</Typography>
                                <Typography>Descripción: {s.description}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton onClick={() => openModal('servicio', s.service_id, s)}>
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete('servicio', s.service_id)}>
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Box>

            {/* Horarios */}
            <Box sx={{ flex: 1, pl: { md: 2 } }}>
                <Box textAlign="center" mb={2}>
                    <Button variant="contained" color="primary" onClick={() => openModal('horario')}>
                        Agregar horarios
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    {horarios.map((h) => (
                        <Card key={h.schedule_id} sx={{ mb: 2, width: '100%' }}>
                            <CardContent>
                                <Typography>Día: {h.day}</Typography>
                                <Typography>Inicio: {h.start_time}</Typography>
                                <Typography>Fin: {h.end_time}</Typography>
                                <Typography>Categoría: {h.day_category}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton onClick={() => openModal('horario', h.schedule_id, h)}>
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete('horario', h.schedule_id)}>
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Box>

            {/* Modal */}
            <Dialog open={open} onClose={closeModal}>
                <DialogTitle>{indexEdit !== null ? 'Editar' : 'Agregar'} {tipo === 'horario' ? 'Horario' : 'Servicio'}</DialogTitle>
                <DialogContent>
                    {tipo === 'horario' ? (
                        <>
                            <TextField
                                margin="dense"
                                label="Categoría"
                                name="categoria"
                                fullWidth
                                value={form.categoria || ''}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Día"
                                name="dia"
                                fullWidth
                                value={form.dia || ''}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Hora de inicio"
                                name="inicio"
                                fullWidth
                                type='time'
                                value={form.inicio || ''}
                                onChange={handleChange}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300,
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Hora final"
                                name="fin"
                                fullWidth
                                type='time'
                                value={form.fin || ''}
                                onChange={handleChange}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="dense"
                                label="Titulo"
                                name="nombre"
                                fullWidth
                                value={form.nombre || ''}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Descripción"
                                name="descripcion"
                                fullWidth
                                value={form.descripcion || ''}
                                onChange={handleChange}
                                multiline
                                required
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">Guardar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
