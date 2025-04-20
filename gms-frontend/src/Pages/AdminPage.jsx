import { useState } from 'react';
import ReusableDrawer from '../Components/SideBar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandymanIcon from '@mui/icons-material/Handyman';
import InfoIcon from '@mui/icons-material/Info';

export default function AdminPage() {
  const [content, setContent] = useState(<p>Este es el contenido principal.</p>);

  const drawerItems = [
    {
      icon: <EngineeringIcon />,
      text: 'Trabajadores',
      onClick: () => setContent(<p>Sección de trabajadores</p>)
    },
    {
      icon: <PeopleIcon />,
      text: 'Usuarios',
      onClick: () => setContent(<p>Sección de usuarios.</p>)
    },
    {
      icon: <ExitToAppIcon />,
      text: 'Asistencia',
      onClick: () => setContent(<p>Sección de asistencia.</p>)
    },
    {
      icon: <AttachMoneyIcon />,
      text: 'Pagos',
      onClick: () => setContent(<p>Sección de pagos.</p>)
    },
    {
      icon: <HandymanIcon />,
      text: 'Estado de máquinas',
      onClick: () => setContent(<p>Sección de estado de máquinas.</p>)
    },
    {
      icon: <InfoIcon />,
      text: 'Información',
      onClick: () => setContent(<p>Sección de información.</p>)
    }
  ];

  return (
    <ReusableDrawer
      title="GEMELOS GYM"
      drawerItems={drawerItems}
    >
      {content}
    </ReusableDrawer>
  );
}
