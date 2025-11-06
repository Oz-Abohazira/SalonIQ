import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react';
import { assets } from '../assets/assets';

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment, slotDateFormat, currencySymbol } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-xl font-medium'>All Appointments</p>

      <div className='bg-white border border-neutral-200 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Headers */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_3fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-b-neutral-300'>
          <p>#</p>
          <p>Client</p>
          <p>Date & Time</p>
          <p>Service</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between items-center sm:grid sm:grid-cols-[0.5fr_3fr_3fr_2fr_1fr_1fr] 
                            text-gray-500 py-3 px-6 border-b border-b-neutral-300 hover:bg-gray-50 max-sm:gap-2' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-12 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <div className='flex items-center gap-2'>
                <p>{slotDateFormat(item.slotDate)}</p>
                <p>|</p>
                <p>{item.slotStart.toLowerCase() + '-' + item.slotEnd.toLowerCase()}</p>
              </div>
              <p className='text-gray-700 font-medium'>{item.serviceData.name}</p>
              <p>{currencySymbol}{item.price}</p>
              {
                item.is_canceled
                  ? <p className='text-red-400 text-xs font-medium'>Canceled</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default AllAppointments