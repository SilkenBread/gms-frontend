import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import RecepcionistPage from "./Pages/RecepcionistPage";
import TrainerPage from "./Pages/TrainerPage";
import WorkerPage from "./Pages/WorkerPage";
import LoginPage from "./Pages/LoginPage";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  return token ? element : navigate("/");
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />}/>
        <Route path="/recepcionist" element={<PrivateRoute element={<RecepcionistPage />} />}/>
        <Route path="/trainer" element={<PrivateRoute element={<TrainerPage />} />}/>
        <Route path="/worker" element={<PrivateRoute element={<WorkerPage />} />}/>
      </Routes>
    </Router>
  );
}

export default App;
