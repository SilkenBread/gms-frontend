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
    useMediaQuery,
    Menu,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { addMember, deleteMember, getMembers, updateMember } from '../api/members_api';

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

const columns = [
    { id: 'id', label: 'Cédula' },
    { id: 'name', label: 'Nombre' },
    { id: 'surname', label: 'Apellido' },
    { id: 'email', label: 'Email' },
    { id: 'birth_date', label: 'Fecha de cumpleaños' },
    { id: 'registration_date', label: 'Fecha de registro' },
    { id: 'active_membership', label: 'Membresía activa' },
    { id: 'membership_type', label: 'Tipo de membresía' },
    { id: 'membership_end_date', label: 'Fin de membresía' }
];

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
            setFilteredRows(updated.filter(
                (row) =>
                    row.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.user.id.includes(searchTerm)
            ));
            const response = await deleteMember(id)
            window.confirm(response.message);
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
            window.confirm(response.message);
        } else {
            const newRows = [...rows, formData];
            setRows(newRows);
            setFilteredRows(newRows);
            const response = await addMember(newUser, newMember)
            window.confirm(response.message);
        }
        handleCloseModal();
    };

    const isMobile = useMediaQuery('(max-width:600px)'); // Detect mobile

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // Default visible columns for mobile
    const [visibleColumns, setVisibleColumns] = React.useState(['id', 'active_membership', 'membership_end_date', 'actions']);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleToggleColumn = (columnId) => {
        if (visibleColumns.includes(columnId)) {
            setVisibleColumns(prev => prev.filter(c => c !== columnId));
        } else {
            setVisibleColumns(prev => [...prev, columnId]);
        }
    };

    const isColumnVisible = (columnId) => {
        if (!isMobile) return true; // En desktop mostrar todas
        return visibleColumns.includes(columnId);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    mb: 2,
                    gap: 2,
                }}
            >

                <Typography variant="h5">Gestión de miembros</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Buscar..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ width: 250 }}
                    />
                    {isMobile && (
                        <>
                            <IconButton onClick={handleMenuOpen}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                                {columns.map((col) => (
                                    <MenuItem key={col.id} onClick={() => handleToggleColumn(col.id)}>
                                        <Checkbox checked={visibleColumns.includes(col.id)} />
                                        {col.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                isColumnVisible(col.id) && (
                                    <TableCell key={col.id} sx={{ backgroundColor: '#f5f5f5' }}>
                                        {col.label}
                                    </TableCell>
                                )
                            ))}
                            {isColumnVisible('actions') && (
                                <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                    Acciones
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredRows
                        ).map((row) => (
                            <TableRow key={row.user.id}>
                                {columns.map((col) => (
                                    isColumnVisible(col.id) && (
                                        <TableCell key={col.id}>
                                            {col.id === 'active_membership'
                                                ? (row.member.active_membership ? <Typography color="green">Activo</Typography>
                                                    : <Typography color="red">Inactivo</Typography>)
                                                : row.user[col.id] || row.member[col.id] || '-'}
                                        </TableCell>
                                    )
                                ))}
                                {isColumnVisible('actions') && (
                                    <TableCell>
                                        <IconButton onClick={() => handleEditMember(row)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteMember(row.user.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={columns.length + 1} />
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
                            <MenuItem value="monthly">Mensual</MenuItem>
                            <MenuItem value="annual">Anual</MenuItem>
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
