import React from 'react'
import { Route, Routes,Outlet } from 'react-router-dom';

import OverviewPage from './page/OverviewPage';
import BusinessPage from './page/BusinessPage';
import SalesPage from './page/SalesPage';
import OrdersPage from './page/OrdersPage';
import AnalyticsPage from './page/AnalyticsPage';
import SettingsPage from './page/SettingsPage';
import UsersPage from './page/UsersPage';


import Sidebar from '../../components/componentsNew/Sidebar';
const Home = () => {
  return (
    <div className=' h-screen flex bg-gray-900 text-gray-100 overflow-hidden'>
      
        {/*BG*/}
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
          <div className='absolute inset-0 backdrop-blur-sm'/>

        </div>
        <Sidebar/>

        <Routes>
         <Route path='/' element={<OverviewPage/>}/>
         <Route path='/business' element={<BusinessPage/>}/>
         <Route path='/sales' element={<SalesPage/>}/>
         <Route path='/orders' element={<OrdersPage/>}/>
         <Route path='/analytics' element={<AnalyticsPage/>}/>
         <Route path='/settings' element={<SettingsPage/>}/>
         <Route path='/users' element={<UsersPage/>}/>
        </Routes>
        <Outlet/>
      
    </div>
    
  )
}

export default Home