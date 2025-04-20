import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import RecepcionistPage from "./Pages/RecepcionistPage";
import TrainerPage from "./Pages/TrainerPage";
import WorkerPage from "./Pages/WorkerPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/recepcionist" element={<RecepcionistPage/>}/>
        <Route path="/trainer" element={<TrainerPage/>}/>
        <Route path="/worker" element={<WorkerPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
