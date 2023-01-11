import { useLocation, useNavigate }  from 'react-router-dom'

import React from 'react'

const Header = () => {
  const location = useLocation()
  const navigation = useNavigate()

  const getLocation = (pathName) => {
    if(location.pathname === pathName) {
      return true
    }
  }
  
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img onClick={() => navigation('/')} src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="Realtor" className='h-5 cursor-pointer' />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li onClick={() => navigation('/')} className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${getLocation('/') && 'text-black border-b-red-500'} cursor-pointer`}>Home</li>
            <li onClick={() => navigation('/offers')} className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${getLocation('/offers') && 'text-black border-b-red-500'} cursor-pointer`}>Offers</li>
            <li onClick={() => navigation('/sign-in')} className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${getLocation('/sign-in') && 'text-black border-b-red-500'} cursor-pointer`}>Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header