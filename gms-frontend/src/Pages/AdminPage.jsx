import { useState } from 'react';
import ReusableDrawer from '../Components/SideBar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandymanIcon from '@mui/icons-material/Handyman';
import InfoIcon from '@mui/icons-material/Info';
import ManageMember from '../Components/ManageMembers';
import ManageEmployees from '../Components/ManageEmployees';
import ManageAttendance from '../Components/ManageAttendance';
import ManagePayment from '../Components/ManagePayment';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ListPayment from '../Components/ListPayment';

export default function AdminPage() {
  const [content, setContent] = useState(<h1>Bienvenido!</h1>);

  const drawerItems = [
    {
      icon: <EngineeringIcon />,
      text: 'Trabajadores',
      onClick: () => setContent(<ManageEmployees/>)
    },
    {
      icon: <PeopleIcon />,
      text: 'Miembros',
      onClick: () => setContent(<ManageMember/>)
    },
    {
      icon: <ExitToAppIcon />,
      text: 'Asistencia',
      onClick: () => setContent(<ManageAttendance/>)
    },
    {
      icon: <AttachMoneyIcon />,
      text: 'Pagos',
      onClick: () => setContent(<ManagePayment/>)
    },
    {
      icon: <PriceCheckIcon />,
      text: 'Historial de pagos',
      onClick: () => setContent(<ListPayment/>)
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
