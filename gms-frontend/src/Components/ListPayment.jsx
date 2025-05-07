import * as React from 'react';
import {
    Box, IconButton, Typography, TextField, Menu, MenuItem, Checkbox,
    Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme, useMediaQuery } from '@mui/material';
import { getPayments } from '../api/payment_api';

export default function ListPayment() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [searchTerm, setSearchTerm] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [visibleColumns, setVisibleColumns] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    const columns = [
        { id: 'cedula', label: 'Cédula' },
        { id: 'plan', label: 'Plan' },
        { id: 'amount', label: 'Monto' },
        { id: 'payment_date', label: 'Fecha de pago' },
        { id: 'created_by', label: 'Registrado por' },
    ];

    React.useEffect(() => {
        if (isMobile) {
            setVisibleColumns(['cedula', 'amount', 'payment_date']);
        } else {
            setVisibleColumns(columns.map(col => col.id));
        }
    }, [isMobile]);

    const cargarPagos = async () => {
        try {
            const data = await getPayments();
            setRows(data);
        } catch (err) {
            console.log('No se pudo cargar el historial de datos');
        }
    };

    React.useEffect(() => {
        cargarPagos();
    }, []);

    const filteredRows = rows.filter((row) =>
        row.member.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

    const handleSearchChange = (event) => setSearchTerm(event.target.value);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleToggleColumn = (columnId) => {
        setVisibleColumns((prev) =>
            prev.includes(columnId) ? prev.filter((id) => id !== columnId) : [...prev, columnId]
        );
    };

    const isColumnVisible = (columnId) => {
        if (!isMobile) return true; 
        return visibleColumns.includes(columnId);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                <Typography variant="h5">Historial de pagos</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Buscar cédula..."
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
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
                            {columns.map((col) =>
                                isColumnVisible(col.id) && (
                                    <TableCell key={col.id} sx={{ backgroundColor: '#f5f5f5' }}>
                                        {col.label}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredRows
                        ).map((row) => (
                            <TableRow key={row.payment_id}>
                                {isColumnVisible('cedula') && <TableCell>{row.member.user}</TableCell>}
                                {isColumnVisible('plan') && <TableCell>{row.membership_plan.name}</TableCell>}
                                {isColumnVisible('amount') && <TableCell>{row.amount}</TableCell>}
                                {isColumnVisible('payment_date') && <TableCell>{row.payment_date}</TableCell>}
                                {isColumnVisible('created_by') && <TableCell>{row.created_by}</TableCell>}
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={5} />
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
                                colSpan={5}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={(e) => onPageChange(e, page + 1)} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={(e) => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
