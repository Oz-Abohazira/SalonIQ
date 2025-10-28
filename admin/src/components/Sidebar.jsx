import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const sideBarMenuItems = [
        {
            icon: assets.home_icon,
            text: 'Dashboard',
            path: '/dashboard'
        },
        {
            icon: assets.appointment_icon,
            text: 'Appointments',
            path: '/all-appointments'
        },
        {
            icon: assets.add_icon,
            text: 'Add Service',
            path: '/add-service'
        },
        {
            icon: assets.people_icon,
            text: 'Services List',
            path: '/service-list'
        },
    ]

    const { aToken } = useContext(AdminContext)

    return (
        <div className='min-h-screen bg-white border-r border-gray-200'>
            {
                aToken &&
                <ul className='text-[#515151] mt-5'>
                    {sideBarMenuItems.map((item, index) => (
                        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                                ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} key={index} to={item.path}>
                            <img src={item.icon} alt="" />
                            <p>{item.text}</p>
                        </NavLink>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Sidebar