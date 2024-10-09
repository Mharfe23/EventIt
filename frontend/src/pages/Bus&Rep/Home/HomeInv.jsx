import React from 'react'
import { Route, Routes,Outlet } from 'react-router-dom';

import Overview from './pages/Overview';
import Sidebar from '../../../components/componentsNew/Sidebar';

const HomeInv = () => {
  return (
    <div className=' h-screen flex bg-gray-900 text-gray-100 overflow-hidden'>
      
        {/*BG*/}
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
          <div className='absolute inset-0 backdrop-blur-sm'/>

        </div>
        <Sidebar path={'/inv/home'}/>

        <Routes>
         <Route path='/' element={<Overview/>}/>
         <Route path='/business' />
         <Route path='/settings' />
         <Route path='/users'/>
         <Route path='/notifications' />

        </Routes>
        <Outlet/>
      
    </div>
    
  )
}

export default HomeInv