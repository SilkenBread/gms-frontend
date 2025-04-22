import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    TableHead,
    IconButton,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
    const handleBackButtonClick = (event) => onPageChange(event, page - 1);
    const handleNextButtonClick = (event) => onPageChange(event, page + 1);
    const handleLastPageButtonClick = (event) =>
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, nombre, apellido, email, telefono, rol) {
    return { id, nombre, apellido, email, telefono, rol };
}

const initialRows = [
    createData('123456789', 'Sandra', 'Palacios', 'sandra@gmail.com', '3011234567', 'user'),
    createData('234567890', 'Carlos', 'Pérez', 'carlos@gmail.com', '3001234567', 'user'),
    createData('345678901', 'Lucía', 'Ramírez', 'lucia@hotmail.com', '3112233445', 'user'),
    createData('456789012', 'Miguel', 'Torres', 'miguel@outlook.com', '3021122334', 'user'),
    createData('567890123', 'Ana', 'Gómez', 'ana@gmail.com', '3133344556', 'user'),
    createData('678901234', 'Julián', 'Martínez', 'julian@yahoo.com', '3044455667', 'user'),
    createData('789012345', 'Laura', 'Vega', 'laura@gmail.com', '3155566778', 'user'),
];


export default function ManageUser() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [rows, setRows] = React.useState(initialRows);
    const [filteredRows, setFilteredRows] = React.useState(initialRows);
    const [openModal, setOpenModal] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        rol: ''
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = rows.filter(
            (row) =>
                row.nombre.toLowerCase().includes(value.toLowerCase()) ||
                row.apellido.toLowerCase().includes(value.toLowerCase()) ||
                row.email.toLowerCase().includes(value.toLowerCase()) ||
                row.id.includes(value)
        );
        setFilteredRows(filtered);
        setPage(0);
    };

    const handleOpenModal = () => {
        setFormData({ id: '', nombre: '', apellido: '', email: '', telefono: '', rol: '' });
        setIsEditMode(false);
        setOpenModal(true);
    };

    const handleEditUser = (user) => {
        setFormData(user);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleDeleteUser = (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");
        if (confirm) {
            const updated = rows.filter((row) => row.id !== id);
            setRows(updated);
            setFilteredRows(updated.filter(
                (row) =>
                    row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.id.includes(searchTerm)
            ));
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEditMode(false);
        setFormData({ id: '', nombre: '', apellido: '', email: '', telefono: '', rol: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveUser = () => {
        if (isEditMode) {
            const updated = rows.map((row) => row.id === formData.id ? formData : row);
            setRows(updated);
            setFilteredRows(updated);
        } else {
            const exists = rows.find((row) => row.id === formData.id);
            if (exists) {
                alert("La cédula ya está registrada.");
                return;
            }
            const newRows = [...rows, formData];
            setRows(newRows);
            setFilteredRows(newRows);
        }
        handleCloseModal();
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">Gestión de Usuarios</Typography>
                <TextField
                    size="small"
                    placeholder="Buscar..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ width: 250 }}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Cédula</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredRows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.apellido}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.telefono}</TableCell>
                                <TableCell>{row.rol}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditUser(row)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteUser(row.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                                count={filteredRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                colSpan={7}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
                <Box sx={{ p: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Crear Usuario
                    </Button>
                </Box>
            </TableContainer>

            {/* Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditMode ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Cédula"
                        name="id"
                        fullWidth
                        margin="normal"
                        value={formData.id}
                        onChange={handleInputChange}
                        disabled={isEditMode}
                    />
                    <TextField
                        label="Nombre"
                        name="nombre"
                        fullWidth
                        margin="normal"
                        value={formData.nombre}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Apellido"
                        name="apellido"
                        fullWidth
                        margin="normal"
                        value={formData.apellido}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Correo"
                        name="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Teléfono"
                        name="telefono"
                        fullWidth
                        margin="normal"
                        value={formData.telefono}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Rol"
                        name="rol"
                        fullWidth
                        margin="normal"
                        select
                        value={formData.rol}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="moderator">Moderator</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSaveUser}>
                        {isEditMode ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
