import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { servicesData } = useContext(AppContext)

  const buttonStyle = 'text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:text-white transition-all duration-300';

  return (
    <div>
      <p className='text-2xl pb-3 mt-12 font-medium text-zinc-700 border-b border-b-gray-300'>My Appointments</p>
      <div>
        {servicesData.slice(0, 3).map((item, index) => (
          <div className='grid grid-cols-[1fr-2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-300' key={index}>
            <div>
              <img className='w-36 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold text-lg'>{item.name}</p>
              <p className='text-zinc-700 font-medium mt-1 text-base'>{item.category}</p>
              <p>Stylist: <span>Hannah Banana</span> </p>
              <p className='mt-1'>Appoitment Time: <span className='text-neutral-700 font-medium'>25 July, 2025 | 11:30am</span></p>
            </div>
            <div></div>
            <div className='flex flex-col gap-4 justify-center'>
              <button className={`${buttonStyle} hover:bg-primary `}>Pay Online</button>
              <button className={`${buttonStyle} hover:bg-red-600`}>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments