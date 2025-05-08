import React, { useState } from 'react';
import {
    Grid, Typography, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Box,
    Card,CardContent, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ManageLanding() {
    const [horarios, setHorarios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState('');
    const [form, setForm] = useState({});
    const [indexEdit, setIndexEdit] = useState(null);

    const openModal = (tipo, index = null, datos = {}) => {
        setTipo(tipo);
        setForm(datos);
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

    const handleSave = () => {
        if (tipo === 'horario') {
            const nuevos = [...horarios];
            if (indexEdit !== null) {
                nuevos[indexEdit] = form;
            } else {
                nuevos.push(form);
            }
            setHorarios(nuevos);
        } else {
            const nuevos = [...servicios];
            if (indexEdit !== null) {
                nuevos[indexEdit] = form;
            } else {
                nuevos.push(form);
            }
            setServicios(nuevos);
        }
        closeModal();
    };

    const handleDelete = (tipo, index) => {
        if (tipo === 'horario') {
            const copia = [...horarios];
            copia.splice(index, 1);
            setHorarios(copia);
        } else {
            const copia = [...servicios];
            copia.splice(index, 1);
            setServicios(copia);
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
                    {servicios.map((s, i) => (
                        <Card key={i} sx={{ mb: 2, width: '100%' }}>
                            <CardContent>
                                <Typography>Nombre: {s.nombre}</Typography>
                                <Typography>Descripción: {s.descripcion}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton onClick={() => openModal('servicio', i, s)}>
                                        <EditIcon fontSize="small" color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete('servicio', i)}>
                                        <DeleteIcon fontSize="small" color="error"/>
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
                    {horarios.map((h, i) => (
                        <Card key={i} sx={{ mb: 2, width: '100%' }}>
                            <CardContent>
                                <Typography>Día: {h.dia}</Typography>
                                <Typography>Inicio: {h.inicio}</Typography>
                                <Typography>Fin: {h.fin}</Typography>
                                <Typography>Categoría: {h.categoria}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <IconButton onClick={() => openModal('horario', i, h)}>
                                        <EditIcon fontSize="small" color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete('horario', i)}>
                                        <DeleteIcon fontSize="small" color="error"/>
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
                                    step: 300, // pasos de 5 minutos (300 segundos)
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="dense"
                                label="Nombre"
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
