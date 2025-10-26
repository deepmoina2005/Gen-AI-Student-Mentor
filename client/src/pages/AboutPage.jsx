import React from 'react'
import About from '../components/About'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const AboutPage = () => {
  return (
    <div>
        <Navbar/>
        <About/>
        <HowItWorks/>
        <Footer/>
    </div>
  )
}

export default AboutPage