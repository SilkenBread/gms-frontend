import ReusableDrawer from '../Components/SideBar';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import ManageMember from '../Components/ManageMembers';
import { useNavigate } from 'react-router-dom';


export default function RecepcionistPage() {
    const [content, setContent] = useState(<p>Este es el contenido principal.</p>);
    const navigate = useNavigate();

    const items = [
        {
            icon: <CheckCircleIcon />,
            text: 'Asistencia',
            onClick: () => navigate('/register-access')
        },
        {
            icon: <PeopleIcon />,
            text: 'Usuarios',
            onClick: () => setContent(<ManageMember/>)
        }
    ];

    return (
        <ReusableDrawer
            title="GEMELOS GYM"
            drawerItems={items}
        >
            {content}
        </ReusableDrawer>
    );

}