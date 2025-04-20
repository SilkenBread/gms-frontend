import { useState } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ReusableDrawer from '../Components/SideBar';
import LoginForm from './LoginPage';

export default function AdminView() {
  const [content, setContent] = useState(<p>Este es el contenido principal.</p>);

  const drawerItems = [
    {
      icon: <InboxIcon />,
      text: 'Prueba 1',
      onClick: () => setContent(<LoginForm />)
    },
    {
      icon: <MailIcon />,
      text: 'Prueba 2',
      onClick: () => setContent(<p>Sección de correos.</p>)
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
