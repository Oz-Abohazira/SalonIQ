import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyAppointments = () => {

  const { backendUrl, baseUserUrl, token } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + baseUserUrl + '/get-appointments', { headers: { token } });

      data.success
        ? setAppointments(data.appointments.reverse())
        : toast.error('Error getting appointments data')

    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const buttonStyle = 'text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:text-white transition-all duration-300';

  return (
    <div>
      <p className='text-2xl pb-3 mt-12 font-medium text-zinc-700 border-b border-b-gray-300'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr-2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-300'>
            <div>
              <img className='w-36 bg-indigo-50' src={item.serviceData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold text-lg'>{item.serviceData.name}</p>
              <p className='text-zinc-700 font-medium mt-1 text-base'>{item.serviceData.category}</p>
              <p>Stylist: <span>Hannah Banana</span> </p>
              <p className='mt-1'>When <span className='text-neutral-700 font-medium'>{item.slotDate} | {(item.slotStart + ' - ' + item.slotEnd).toLowerCase()}</span></p>
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