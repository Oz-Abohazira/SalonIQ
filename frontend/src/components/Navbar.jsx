import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.group')) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);

    }, [showDropdown])

    const hrStyle = 'border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden';

    const { token, setToken } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.full_logo_right} alt="Salon IQ Logo" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                    <hr className={hrStyle} />
                </NavLink>
                <NavLink to='/services'>
                    <li className='py-1'>ALL SERVICES</li>
                    <hr className={hrStyle} />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                    <hr className={hrStyle} />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img onClick={() => setShowDropdown(!showDropdown)} className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                            <img onClick={() => setShowDropdown(!showDropdown)} className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${showDropdown ? 'block' : 'hidden'} group-hover:block`}>
                                <div className='min-w-44 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-profile')}>My Profile</p>
                                    <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-appointments')}>My Appointments</p>
                                    <p className='hover:text-black cursor-pointer' onClick={() => { logout(); }}>Logout</p>
                                </div>
                            </div>

                        </div>
                        : <button className='bg-primary text-white px-6 py-3 rounded-full font-light hidden md:block cursor-pointer'
                            onClick={() => navigate('/login')} >
                            Create Account
                        </button>
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* ---- Mobile Menu ---- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-10' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-5 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='py-2 px-6 rounded'>Home</p></NavLink>
                        <hr className='w-2/3' />
                        <NavLink onClick={() => setShowMenu(false)} to='/services'><p className='py-2 px-6 rounded'>All Services</p></NavLink>
                        <hr className='w-2/3 ' />
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='py-2 px-6 rounded'>About</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar