import ReusableDrawer from '../Components/SideBar';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import ManageMember from '../Components/ManageMembers';
import RegisterAccess from '../Components/RegisterAccess';

export default function RecepcionistPage() {
    const [content, setContent] = useState(<p>Este es el contenido principal.</p>);
    
    const items = [
        {
            icon: <CheckCircleIcon />,
            text: 'Asistencia',
            onClick: () => setContent(<RegisterAccess/>)
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