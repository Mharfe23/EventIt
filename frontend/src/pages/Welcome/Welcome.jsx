import React from 'react'
import Navbar from '../../components/welcome/Navbar'
import Hero from '../../components/welcome/Hero'
import Matchmaking from '../../components/welcome/Matchmaking'
import Souhaiternouscontacter from '../../components/welcome/souhaiternouscontacter'
import Footer from '../../components/welcome/Footer'
import TopNavbar from '../../components/welcome/TopNavbar'


const Welcome = () => {
    return (
        <>
        <TopNavbar hiddenBelowMd={true} />
        <Navbar/>
        <Hero/>
        <Matchmaking/>
        <Souhaiternouscontacter/>
        <Footer/>
        </>
      )
}

export default Welcome