import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import logo from './assets/logo.jpg'
import Home from './components/Home'
import Chart from './components/Chart'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-200'>
      {/* Navbar Container */}
      <header className='bg-slate-900 border-b border-slate-800 shadow-lg'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            
            {/* Logo Section */}
            <div className='shrink-0'>
              <NavLink to='/' className="block hover:opacity-80 transition-opacity">
                <img 
                  src={logo} 
                  alt='logo' 
                  className='h-14 w-14 rounded-full border-2 border-amber-500/50 object-cover shadow-md shadow-amber-500/20'
                />
              </NavLink>
            </div>

            {/* Center Action - Primary CTA */}
            <div className='grow flex justify-center'>
              <NavLink to='/convert-chart'>
                <button className='bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700
                 hover:border-amber-500/50 px-6 py-2 rounded-full font-bold tracking-wider transition-all duration-300
                  transform hover:scale-105 active:scale-95 shadow-sm hover:cursor-pointer ml-20'>
                  CONVERT CHART
                </button>
              </NavLink>
            </div>

            {/* Right Side - Auth Links */}
            <div className='flex items-center gap-6'>
              <NavLink 
                to='/sign-up' end 
                className='border-22 border-transparent text-sm font-medium hover:text-amber-400 transition-colors hover:cursor-pointer duration-2000  '
              >
                Sign Up
              </NavLink>
              
              <NavLink to='/log-in'>
                <button className='bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2 rounded-lg font-bold transition-all shadow-lg shadow-amber-500/10 hover:cursor-pointer'>
                  Login
                </button>
              </NavLink>
            </div>

          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className='max-w-7xl mx-auto p-6'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/convert-chart' element={<Chart />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/log-in' element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
