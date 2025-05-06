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
import { addEmployee, deleteEmployee, getEmployees, searchEmployee, updateEmployee } from '../api/employee_api';
import { validateCedula, validateEmail, validatePassword } from '../utils/Valitations';

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
        groups: ''
    },
    employee: {
        hire_date: '',
        salary: '',
    }
};

const columns = [
    { id: 'id', label: 'Cédula' },
    { id: 'name', label: 'Nombre' },
    { id: 'surname', label: 'Apellido' },
    { id: 'email', label: 'Email' },
    { id: 'hire_date', label: 'Fecha de contratación' },
    { id: 'salary', label: 'Salario' },
];


export default function ManageEmployees() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState(cleanForm);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;
    
    const cargarEmpleados = async () => {
        try {
            const data = await getEmployees();
            setRows(data);
            setFilteredRows(data)
        } catch (err) {
            console.log('No se pudieron cargar los empleados');
        }
    };
    
    React.useEffect(() => {
        cargarEmpleados();
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

    const handleEditEmployee = (employee) => {
        setFormData(employee);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleDeleteEmployee = async (id) => {
        const confirm = window.confirm("¿Estás seguro de eliminar este empleado?");
        if (confirm) {
            const response = await deleteEmployee(id)
            window.confirm(response.message);
            await cargarEmpleados()
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEditMode(false);
        setFormData(cleanForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['id', 'name', 'surname', 'email', 'password', 'groups'].includes(name)) {
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
                employee: {
                    ...prev.employee,
                    [name]: value
                }
            }));
        }
    };

    const validateForm = async () => {
            const { id, name, surname, email, password, groups } = formData.user;
            const { hire_date, salary } = formData.employee;
        
            // Verificar que los campos no estén vacíos
            if (!id || !name || !surname || !email || !groups || !hire_date || !salary) {
                alert("Todos los campos son obligatorios.");
                return false;
            }
        
            // Validar cédula (formato)
            const cedulaValidation = validateCedula(id);
            if (cedulaValidation !== true) {
                alert(cedulaValidation);
                return false;
            }
        
            // Validar correo electrónico
            const emailValidation = validateEmail(email);
            if (emailValidation !== true) {
                alert(emailValidation);
                return false;
            }
        
            if (!isEditMode) {
                // Validar si ya existe un empleado con esa cédula
                const response = await searchEmployee(id);
                if (response) {
                    alert("Esta cédula ya existe");
                    return false;
                }
        
                // Validar contraseña solo si no está en modo edición
                const passwordValidation = validatePassword(password);
                if (passwordValidation !== true) {
                    alert(passwordValidation);
                    return false;
                }
            }
        
            return true;
        };

    const handleSaveEmployee = async () => {
        if(!(await validateForm())){
            return;
        }
        console.log("Por guardar: ",formData)
        if (isEditMode) {
            const response = await updateEmployee(formData)
            window.confirm(response.message);
            await cargarEmpleados()
        } else {
            const response = await addEmployee(formData)
            window.confirm(response.message);
            await cargarEmpleados()
        }
        handleCloseModal();
    };

    const isMobile = useMediaQuery('(max-width:600px)'); // Detect mobile

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // Default visible columns for mobile
    const [visibleColumns, setVisibleColumns] = React.useState(['id', 'name', 'actions']);

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

                <Typography variant="h5">Gestión de trabajadores</Typography>
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
                                {isColumnVisible('id') && <TableCell>{row.user.id}</TableCell>}
                                {isColumnVisible('name') && <TableCell>{row.user.name}</TableCell>}
                                {isColumnVisible('surname') && <TableCell>{row.user.surname}</TableCell>}
                                {isColumnVisible('email') && <TableCell>{row.user.email}</TableCell>}
                                {isColumnVisible('hire_date') && <TableCell>{row.employee.hire_date}</TableCell>}
                                {isColumnVisible('salary') && <TableCell>{row.employee.salary}</TableCell>}
                                {isColumnVisible('actions') && (
                                    <TableCell>
                                        <IconButton onClick={() => handleEditEmployee(row)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteEmployee(row.user.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                )}
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
                                colSpan={7}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
                <Box sx={{ p: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Crear trabajador
                    </Button>
                </Box>
            </TableContainer>

            {/* Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditMode ? 'Editar trabajador' : 'Crear trabajador'}</DialogTitle>
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
                        label="Fecha de contratación"
                        name="hire_date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formData.employee.hire_date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Salario"
                        name="salary"
                        type="number"
                        inputProps={{ step: "0.01" }}
                        fullWidth
                        margin="normal"
                        value={formData.employee.salary}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-label">Rol</InputLabel>
                        <Select
                            labelId="group-label"
                            name="groups"
                            value={formData.employee.groups}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="administrator">Administrador</MenuItem>
                            <MenuItem value="receptionist">Recepcionista</MenuItem>
                            <MenuItem value="trainer">Entrenador</MenuItem>
                        </Select>
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSaveEmployee}>
                        {isEditMode ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
