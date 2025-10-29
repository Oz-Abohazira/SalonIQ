import React, { useContext, useState } from 'react'
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

    const { aToken } = useContext(AdminContext);
    const [sideBarOpen, setSideBarOpen] = useState(true);

    return (
        <div className={`min-h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
                      ${!sideBarOpen ? 'min-w-22' : 'min-w-68'}`
        }>
            {
                aToken &&
                <div className={`flex flex-col ${!sideBarOpen ? 'max-w-25 ' : ''}`}>
                    <img onClick={() => setSideBarOpen(!sideBarOpen)}
                    // text-primary text-5xl ml-auto px-4 pb-2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110
                        className={`${sideBarOpen ? 'ml-auto mr-4 w-8' : 'mx-auto'} w-8 mt-4 pb-2 cursor-pointer`}
                        src={`${sideBarOpen ? assets.sidebar_icon_left : assets.sidebar_icon_right}`} >
                        {/* {sideBarOpen ? '<' : '>'} */}
                    </img>
                    <ul className='text-[#515151]'>
                        {sideBarMenuItems.map((item, index) => (
                            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:pl-8 cursor-pointer
                                ${sideBarOpen ? 'md:min-w-68' : 'md:min-w-full'}
                                ${isActive && 'bg-[#F2F3FF] border-r-4 border-primary font-medium'}`} key={index} to={item.path}>
                                <img className='w-6' src={item.icon} alt="" />
                                {sideBarOpen && <p>{item.text}</p>}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Sidebar