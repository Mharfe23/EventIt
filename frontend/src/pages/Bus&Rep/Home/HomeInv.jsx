import React from 'react'
import { Route, Routes,Outlet } from 'react-router-dom';
import { BarChart2, Menu, Settings, ShoppingBag, Users,LogOut,Send} from "lucide-react";
import { UsersRound } from 'lucide-react';
import Overview from './pages/Overview';
import Sidebar from '../../../components/componentsNew/Sidebar';
import MonEntreprise from './pages/MonEntreprise';
import MonEvent from './pages/MonEvent';
import SettingsPage from '../../Home/page/SettingsPage';
import { useAuthContext } from '../../../Context/AuthContext';
import { Calendar } from 'lucide-react';
import UsersPageInv from './pages/UsersPageInv';
const HomeInv = () => {
  const {authUser} = useAuthContext();

  const Repr = authUser.user_id;
  let SIDEBAR_ITEMS;
  if (Repr){
    SIDEBAR_ITEMS = [
      {
        name: "Apercu",
        icon: BarChart2,
        color: "#6366f1",
        href: "/",
      },
      {name: "Représentant",
        icon: UsersRound,
        color: "#6366f1",
        href: "/Participant"},
      { name: "Evenement", icon: Calendar, color: "#EC4899", href: "/Event" },
      
      { name: "Parametre", icon: Settings, color: "#6EE7B7", href: "/settings" },
    ];

  }else{
    SIDEBAR_ITEMS = [
      {
        name: "Apercu",
        icon: BarChart2,
        color: "#6366f1",
        href: "/",
      },
      { name: "Entreprise", icon: ShoppingBag, color: "#F87171", href: "/Entreprise" },
      { name: "Evenement", icon: Users, color: "#EC4899", href: "/Event" },
      
      { name: "Parametre", icon: Settings, color: "#6EE7B7", href: "/settings" },
    ];
  }

 


  return (
    <div className=' h-screen flex bg-gray-900 text-gray-100 overflow-hidden'>
      
        {/*BG*/}
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
          <div className='absolute inset-0 backdrop-blur-sm'/>

        </div>
        <Sidebar path={'/inv/home'} elements={SIDEBAR_ITEMS}/>

        <Routes>
         <Route path='/' element={<Overview/>}/>
         <Route path='/Entreprise' element={<MonEntreprise/>} />
         <Route path='/Event' element={<MonEvent/>}/>
         <Route path='/settings' element={<SettingsPage/>}/>
         <Route path='/Participant' element={<UsersPageInv/>}/>
        

        </Routes>
        <Outlet/>
      
    </div>
    
  )
}

export default HomeInv