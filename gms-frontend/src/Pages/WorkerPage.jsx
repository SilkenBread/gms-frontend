import ReusableDrawer from '../Components/SideBar';
import HandymanIcon from '@mui/icons-material/Handyman';
import { useState } from 'react';

export default function WorkerPage() {
    const [content, setContent] = useState(<p>Este es el contenido principal.</p>);
    const items = [
        {
            icon: <HandymanIcon />,
            text: 'Estado de máquinas',
            onClick: () => setContent(<p>Sección de actualización de estado de máquina.</p>)
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