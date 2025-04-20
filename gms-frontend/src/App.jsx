import { useState } from 'react'
import HomePage from './Pages/HomePage';
import DesktopNavigation from './Navigation/DesktopNavigation';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer toastClassName='toastContainerBox' transition={Flip} position='top-center' />
      <Router>
        <DesktopNavigation />
        <div className='margin'>
            <Routes>
              {/*User Routes  */}
              <Route path='/home' index element={<HomePage />} />
            </Routes>
        </div>
      </Router >
    </>
   
   //      <div>
   //        <a href="https://react.dev" target="_blank">
   //          <img src={reactLogo} className="logo react" alt="React logo" />
   //        </a>
   //      </div>
   //      <h1>Vite + React</h1>
   //      <div className="card">
   //        <button onClick={() => setCount((count) => count + 1)}>
   //          count is {count}
   //        </button>
  )
}

export default App
