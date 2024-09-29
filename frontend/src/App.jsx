// import { useState } from 'react'
import Welcome from './pages/Welcome/Welcome'
import Login from './pages/Login/login'
import Signup from './pages/Signup/Signup'
import SignupInv from './pages/Bus&Rep/Signup/SignupInv'
import { useAuthContext } from './Context/AuthContext'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

function App() {

const {authUser} = useAuthContext();
//h-screen instead of h-full
  return (
    <div className=' bg-gray-100 h-full'>
       <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={(authUser && authUser.organizer_id) ? <Navigate to="/home"/>:<Login />} />
          <Route path='/signup' element={(authUser && authUser.organizer_id) ? <Navigate to="/home"/>:<Signup/>} />
          <Route path='/home/*' element={(authUser && authUser.organizer_id )? <Home/>:<Navigate to="/"/>}/>
          <Route path='/signup/inv' element={(authUser && authUser.organizer_id) ? <Navigate to="/home"/>:<SignupInv/>} />
          
        </Routes>
      </Router>
    <Toaster />

    </div>
    
    
  )
}

export default App
