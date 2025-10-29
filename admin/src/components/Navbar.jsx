import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  }

  return (
    <div className='min-h-[9vh] flex justify-between items-center px-4 sm:px-10 py-3 border-b border-neutral-200 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        {/* <p className='px-2.5 py-0.5 mt-3 border border-gray-500 text-gray-600 rounded-full'>{aToken ? 'Admin' : ''}</p> */}
      </div>
      <button onClick={() => logout()} className='bg-primary text-white text-sm py-2 px-8 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar