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
    FormControlLabel,
    InputLabel,
    Select,
    FormControl,
    Checkbox,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { loginUser, addMember, getMembers, updateMember, deleteMember } from '../api/members_api';

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

const cleanForm = {
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
    },
    member: {
        birth_date: '',
        registration_date: '',
        active_membership: true,
        membership_end_date: '',
        membership_type: '',
    }
};

export default function ManageMember() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState(cleanForm);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    React.useEffect(() => {
        const cargarMiembros = async () => {
            try {
                const data = await getMembers();
                setRows(data);
                setFilteredRows(data)
            } catch (err) {
                console.log('No se pudieron cargar los miembros');
            }
        };
        cargarMiembros();
    }, []);
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
                row.user.name.toLowerCase().includes(value.toLowerCase()) ||
                row.user.surname.toLowerCase().includes(value.toLowerCase()) ||
                row.user.email.toLowerCase().includes(value.toLowerCase()) ||
                row.user.id.includes(value)
        );
        setFilteredRows(filtered);
        setPage(0);
    };

    const handleOpenModal = () => {
        setFormData(cleanForm);
        setIsEditMode(false);
        setOpenModal(true);
    };

    const handleEditMember = (member) => {
        setFormData(member);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleDeleteMember = async (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este miembro?");
        if (confirm) {
            const updated = rows.filter((row) => row.user.id !== id);
            setRows(updated);
    
            try {
                const response = await deleteMember(id);
                console.log(response);
            } catch (error) {
                console.error("Error eliminando miembro:", error);
            }
    
            setFilteredRows(updated.filter(
                (row) =>
                    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.id.includes(searchTerm)
            ));
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEditMode(false);
        setFormData(cleanForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (['id', 'name', 'surname', 'email', 'password'].includes(name)) {
            setFormData(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                member: {
                    ...prev.member,
                    [name]: value
                }
            }));
        }
    };


    const handleSaveMember = async () => {
        const newUser = { ...formData.user };
        const newMember = { ...formData.member };
        if (isEditMode) {
            console.log("Edit mode")
            const updated = rows.map((row) => row.user.id === formData.user.id ? formData : row);
            setRows(updated);
            setFilteredRows(updated);
            console.log(formData)
            const response = await updateMember(formData.user.id, formData)
            console.log(response)
        } else {
            const newRows = [...rows, formData];
            setRows(newRows);
            setFilteredRows(newRows);
            await addMember(newUser, newMember)
        }
        handleCloseModal();
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">Gestión de miembros</Typography>
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
                            <TableCell sx={{ textAlign: 'center' }}>Cédula</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Nombre</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Apellido</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Correo</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Fecha de nacimiento</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Fecha de registro</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Tipo membresía</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Membresía activa</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Fin membresía</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredRows
                        ).map((row) => (
                            <TableRow key={row.user.id}>
                                <TableCell>{row.user.id}</TableCell>
                                <TableCell>{row.user.name}</TableCell>
                                <TableCell>{row.user.surname}</TableCell>
                                <TableCell>{row.user.email}</TableCell>
                                <TableCell>{row.member.birth_date}</TableCell>
                                <TableCell>{row.member.registration_date}</TableCell>
                                <TableCell>{row.member.membership_type}</TableCell>
                                <TableCell>
                                    {row.member.active_membership
                                        ? <Typography color="green">Activo</Typography>
                                        : <Typography color="red">Inactivo</Typography>}
                                </TableCell>
                                <TableCell>{row.member.membership_end_date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditMember(row)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteMember(row.id)} color="error">
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
                        Crear Miembro
                    </Button>
                </Box>
            </TableContainer>

            {/* Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditMode ? 'Editar Miembro' : 'Crear Miembro'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Cédula"
                        name="id"
                        fullWidth
                        margin="normal"
                        value={formData.user.id}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Nombre"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={formData.user.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Apellido"
                        name="surname"
                        fullWidth
                        margin="normal"
                        value={formData.user.surname}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.user.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.user.password || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Fecha de nacimiento"
                        name="birth_date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formData.member.birth_date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="membership-type-label">Tipo de membresía</InputLabel>
                        <Select
                            labelId="membership-type-label"
                            value={formData.member.membership_type}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    member: {
                                        ...prev.member,
                                        membership_type: e.target.value
                                    }
                                }))
                            }
                            label="Tipo de membresía"
                        >
                            <MenuItem value="monthly">monthly</MenuItem>
                            <MenuItem value="annual">annual</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Fecha de registro"
                        name="registration_date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formData.member.registration_date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Fecha de finalización de membresía"
                        name="membership_end_date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formData.member.membership_end_date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.member.active_membership}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        member: {
                                            ...prev.member,
                                            active_membership: e.target.checked
                                        }
                                    }))
                                }
                                color="primary"
                            />
                        }
                        label="Membresía activa"
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSaveMember}>
                        {isEditMode ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
