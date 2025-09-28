import React from 'react'
import Nav from './Nav';
import Hero from './Hero';
import Features from './Features';
import Cta from "./Cta";
import Footer from './Footer';

function LandingPage() {
  return (
    <div>
        <Nav/>
        <Hero/>
        <Features/>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default LandingPage;