import { useState, useEffect } from 'react';
import { getAttendance } from '../api/attendance_api.jsx';
import {
    Box,
    Typography,
    Paper,
    Container,
    Chip,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    Person,
    CalendarToday,
    AccessTime,
    Badge,
    Timer,
    Search
} from '@mui/icons-material';

// Función para formatear la fecha y hora
const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '-';
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('es', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export default function ManageAttendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                setLoading(true);
                const data = await getAttendance();
                setAttendanceData(data);
                setError(null);
            } catch (err) {
                console.error('Error al cargar datos de asistencia:', err);
                setError('No se pudieron cargar los datos de asistencia');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    // Filtrar datos según término de búsqueda
    const filteredData = attendanceData.filter((item) => {
        const fullName = `${item.member.name} ${item.member.surname}`.toLowerCase();
        const email = item.member.email.toLowerCase();
        const registeredBy = item.registered_by.toLowerCase();
        const search = searchTerm.toLowerCase();

        return fullName.includes(search) ||
            email.includes(search) ||
            registeredBy.includes(search);
    });

    // Aplicar paginación a los datos filtrados
    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pb: 2
                }}>
                    <CalendarToday sx={{ mr: 2 }} />
                    Registro de Asistencia
                </Typography>

                <Box sx={{ mb: 2, mt: 3 }}>
                    <TextField
                        
                        variant="outlined"
                        placeholder="Buscar por nombre, email o registrado por..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Paper elevation={3} sx={{ p: 0, mt: 3, width: '100%' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography color="error">{error}</Typography>
                        </Box>
                    ) : (
                        <>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} aria-label="tabla de asistencia">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Badge sx={{ mr: 1 }} fontSize="small" />
                                                    <strong>ID</strong>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Person sx={{ mr: 1 }} fontSize="small" />
                                                    <strong>Nombre</strong>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Email</strong>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AccessTime sx={{ mr: 1 }} fontSize="small" />
                                                    <strong>Hora de Entrada</strong>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Registrado por</strong>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Timer sx={{ mr: 1 }} fontSize="small" />
                                                    <strong>Días Restantes</strong>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Estado</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((item) => (
                                                <TableRow
                                                    key={item.attendance_id}
                                                    hover
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {item.attendance_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {`${item.member.name} ${item.member.surname}`}
                                                    </TableCell>
                                                    <TableCell>{item.member.email}</TableCell>
                                                    <TableCell>{formatDateTime(item.entry_time)}</TableCell>
                                                    <TableCell>{item.registered_by}</TableCell>
                                                    <TableCell>
                                                        {(() => {
                                                            const days = item.days_remaining;
                                                            let color = 'success';

                                                            if (days <= 7) {
                                                                color = 'error';
                                                            } else if (days <= 15) {
                                                                color = 'warning';
                                                            }

                                                            return (
                                                                <Chip
                                                                    label={`${days} días`}
                                                                    color={color}
                                                                    size="small"
                                                                    variant="outlined"
                                                                />
                                                            );
                                                        })()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={item.member.active_membership ? 'Activo' : 'Inactivo'}
                                                            color={item.member.active_membership ? 'success' : 'error'}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center">
                                                    No se encontraron registros
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={filteredData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Filas por página:"
                                labelDisplayedRows={({ from, to, count }) =>
                                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                            />
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}