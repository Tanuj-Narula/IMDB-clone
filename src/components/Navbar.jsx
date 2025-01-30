import React, { useState } from 'react'
import Logo from '../video.png'
import { Link } from 'react-router-dom'
import "./navbar.css"

const Navbar = ({setpage}) => {
  const[bg , setbg] =useState(false)

  function color(){
    if(window.scrollY >= 50){
      setbg(true)
    }else{
      setbg(false)
    }
  }
  window.addEventListener("scroll", color)
  return (
    <div className="flex items-center border-b space-x-8 pl-4 py-4 w-full bg-white text-blue-500 fixed z-10 top-0" id={bg ? "header":""}>
        <img className='w-[50px]' src={Logo} alt="" />
        <Link to="/" className=' text-3xl font-semibold' onClick={()=>{setpage(1)}}>Movies</Link>
        <Link to="/Watchlist" className=' text-3xl font-semibold'>Watchlist</Link>
    </div>
  )
}

export default Navbar