// import { useState } from 'react'
import Welcome from './pages/Welcome/Welcome'
import Login from './pages/Login/login'
import Signup from './pages/Signup/Signup'
import { useAuthContext } from './Context/AuthContext'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

function App() {

const {authUser} = useAuthContext();
  return (
    <div className='h-screen bg-gray-100'>
       <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={authUser ? <Navigate to="/home"/>:<Login />} />
          <Route path='/signup' element={authUser ? <Navigate to="/home"/>:<Signup/>} />
          <Route path='/home/*' element={authUser ? <Home/>:<Navigate to="/"/>}/>
          
        </Routes>
      </Router>
    <Toaster />

    </div>
    
    
  )
}

export default App
