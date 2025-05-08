import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, TextField, Button } from "@mui/material";
import { getAttendanceHistory } from "../api/access_api"; 

const AccessHistoryComponent = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [searchDate, setSearchDate] = useState("");

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const data = await getAttendanceHistory();
                setAttendanceData(data);
                setFilteredData(data);
            } catch (error) {
                console.error("Error al obtener historial de asistencia:", error);
            }
        };

        fetchAttendance();
    }, []);

    const handleFilter = () => {
        let filtered = attendanceData;

        if (searchUser.trim()) {
            filtered = filtered.filter(entry => entry.user_name.toLowerCase().includes(searchUser.toLowerCase()));
        }

        if (searchDate.trim()) {
            filtered = filtered.filter(entry => entry.date.includes(searchDate));
        }

        setFilteredData(filtered);
    };

    return (
        <Paper sx={{ padding: 3 }}>
            <h2>Historial de Ingresos</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <TextField
                    label="Buscar por usuario"
                    variant="outlined"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
                <TextField
                    label="Filtrar por fecha"
                    type="date"
                    variant="outlined"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                    Filtrar
                </Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{entry.user_name}</TableCell>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredData.length === 0 && (
                    <p sx={{ mt: 2, textAlign: "center", color: "gray" }}>
                        No hay registro de ingreso.
                    </p>
                )}
            </TableContainer>
        </Paper>
    );
};

export default AccessHistoryComponent;