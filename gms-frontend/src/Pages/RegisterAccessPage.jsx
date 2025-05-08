import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleIcon from "@mui/icons-material/People";
import ReusableDrawer from "../Components/SideBar";
import { registerAccess } from "../api/access_api";
import ManageMember from "../Components/ManageMembers";
import { validateCedula } from "../utils/Valitations";

const RegisterAccessPage = () => {
    const [memberId, setMemberId] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [content, setContent] = useState(<p>Registro de accesos.</p>);

    const handleRegisterAccess = async () => {
        setError("");
        setSuccessMessage("");

        const validationResult = validateCedula(memberId);
        if (validationResult !== true) {
            setError(validationResult); 
            return;
        }

        try {
            const response = await registerAccess(memberId);
            setSuccessMessage(`Asistencia registrada para ${response.member_name} a las ${response.entry_time}`);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        setMemberId(e.target.value);
    };

    const items = [
        {
            icon: <CheckCircleIcon />,
            text: "Registrar Acceso",
            onClick: () => setContent(
                <>
                    <Typography variant="h5" gutterBottom>
                        Registro de Accesos
                    </Typography>
                    <TextField
                        fullWidth
                        label="Número de Cédula"
                        variant="outlined"
                        type="text" 
                        value={memberId}
                        onChange={handleInputChange}
                        error={!!error}
                        helperText={error}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleRegisterAccess}
                    >
                        Registrar Acceso
                    </Button>
                    {successMessage && (
                        <Typography color="success" sx={{ mt: 2 }}>
                            {successMessage}
                        </Typography>
                    )}
                </>
            )
        },
        {
            icon: <PeopleIcon />,
            text: "Usuarios",
            onClick: () => setContent(<ManageMember />)
        }
    ];

    return (
        <ReusableDrawer title="GEMELOS GYM" drawerItems={items}>
            {content}
        </ReusableDrawer>
    );
};

export default RegisterAccessPage;