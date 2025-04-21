import { useState } from 'react';
import ReusableDrawer from '../Components/SideBar';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import RedoIcon from '@mui/icons-material/Redo';
import ManageUser from '../Components/ManageUsers';

export default function TrainerPage() {
    const [content, setContent] = useState(<p>Este es el contenido principal.</p>);

    const items = [
        {
            icon: <PeopleIcon />,
            text: 'Usuarios',
            onClick: () => setContent(<ManageUser/>)
        },
        {
            icon: <LooksOneIcon />,
            text: 'Evaluación inicial',
            onClick: () => setContent(<p>Sección de evaluación incial.</p>)
        },
        {
            icon: <RedoIcon />,
            text: 'Evaluación periódica',
            onClick: () => setContent(<p>Sección evaluación periódica.</p>)
        },
        {
            icon: <SearchIcon />,
            text: 'Buscar evaluación',
            onClick: () => setContent(<p>Sección de búsqueda de evaluación.</p>)
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
