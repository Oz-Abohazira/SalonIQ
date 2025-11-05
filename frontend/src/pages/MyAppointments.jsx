import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, baseUserUrl, token, currency, loadAllServices } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');

    return months[Number(dateArray[1] - 1)] + ' ' + dateArray[0] + ', ' + dateArray[2];
  }

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

  const cancelAppointment = async (appointmentID) => {
    try {
      const { data } = await axios.post(backendUrl + baseUserUrl + '/cancel-appointment', { appointmentID }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getUserAppointments()
        loadAllServices()
      } else {
        toast.error(data.message);
      }


    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const initializePay = (order) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Appointment Payment',
        description: 'Pre-Pay for your upcoming appointment !',
        receipt: order.receipt,
        handler: async (response) => {

          try {
            const { razorpay_order_id } = response;
            const { data } = await axios.post(backendUrl + baseUserUrl + '/verify-razorpay', { razorpay_order_id }, { headers: { token } });

            if (data.success) {
              toast.success(data.message);
              getUserAppointments()
              navigate('/my-appointments');
            } else {
              toast.error(data.message);
            }

          } catch (error) {
            console.log(error);
            toast.error(error);
          }
        }
      }

      const rzp = new window.Razorpay(options);
      rzp.open()

    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const collectPayment = async (appointmentID) => {

    try {
      const { data } = await axios.post(backendUrl + baseUserUrl + '/payment-razorpay', { appointmentID }, { headers: { token } });

      if (data.success) {
        initializePay(data.order)
      }

    } catch (error) {
      console.log(error);
      toast.error(error);
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
              <p className='mt-1'>When <span className='text-neutral-700 font-medium'>{slotDateFormat(item.slotDate)} | {(item.slotStart + ' - ' + item.slotEnd).toLowerCase()}</span></p>
            </div>
            <div></div>
            <div className='flex flex-col gap-4 justify-center'>
              {
                !item.is_canceled && !item.is_paid &&
                <button onClick={() => { collectPayment(item._id) }} className={`${buttonStyle} hover:bg-primary `}>Pay Online</button>

              }
              {
                !item.is_canceled && item.is_paid &&
                <button className={`${buttonStyle} bg-neutral-200 text-primary! cursor-auto! `}>Paid</button>

              }
              {
                !item.is_canceled
                  ? <button onClick={() => cancelAppointment(item._id)} className={`${buttonStyle} hover:bg-red-600`}>Cancel Appointment</button>
                  : <button className={`${buttonStyle} text-red-500! cursor-auto! border-red-600`}>Appointment Canceled</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments