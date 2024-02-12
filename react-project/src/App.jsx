import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Reading from './components/Reading'
import Writing from './components/Writing'

export default function App() {
  

  return (
      <div>
        <Navbar/>
        <Home />
        <About/>
        <Experience/>
        <Projects/>
        <Reading/>
        <Writing/>
      </div>
  )
}

