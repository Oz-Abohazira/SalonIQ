import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'

const Dashboard = () => {

  const { aToken, dashData, getDashboardData, cancelAppointment, slotDateFormat, currencySymbol } = useContext(AdminContext)
  const [earnings, setEarnings] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  const handleOnArrowClick = (newMonth, newYear) => {
    if (newMonth === 0) {
      newYear -= 1;
      newMonth = 12;
    } else if (newMonth === 13) {
      newMonth = 1;
      newYear += 1;
    }

    setMonth(newMonth)
    setYear(newYear)
    calculateMonthlyEarnings(newMonth, newYear)
  }

  const calculateMonthlyEarnings = (monthToCalc, yearToCalc) => {
    const monthAppointments = dashData.latestAppointments.filter((item) => {
      let appointmentMonth = Number(item.slotDate.split('_')[1]);
      let appointmentYear = Number(item.slotDate.split('_')[2]);

      if (appointmentYear === yearToCalc &&
          appointmentMonth === monthToCalc &&
          !item.is_canceled) {
        return item;
      }
    });

    setEarnings(monthAppointments.reduce((sum, item) => sum + item.price, 0));
  }

  useEffect(() => {
    if (aToken && dashData) {
      calculateMonthlyEarnings(month, year)
    }
  }, [aToken, dashData.latestAppointments])

  const styles = {
    card: 'flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all',
    count: 'text-xl font-semibold text-gray-600',
    category: 'text-gray-400',
  }

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>

        <div className='flex flex-col gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100'>
          <div className='flex w-full justify-between'>
            <img className='cursor-pointer' onClick={() => handleOnArrowClick(month - 1, year)} src={assets.sidebar_icon_left} alt="" />
            <p>{month}</p>
            <img className='cursor-pointer' onClick={() => handleOnArrowClick(month + 1, year)} src={assets.sidebar_icon_right} alt="" />
          </div>
          <div className='flex w-full justify-between'>
            <img className='cursor-pointer' onClick={() => handleOnArrowClick(month, year - 1)} src={assets.sidebar_icon_left} alt="" />
            <p>{year}</p>
            <img className='cursor-pointer' onClick={() => handleOnArrowClick(month, year + 1)} src={assets.sidebar_icon_right} alt="" />
          </div>
        </div>

        <div className={styles.card}>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className={styles.count}>{currencySymbol} {earnings}</p>
            <p className={styles.category}>Earnings</p>
          </div>
        </div>

        <div className={styles.card}>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className={styles.count}>{dashData.appointments}</p>
            <p className={styles.category}>Appointments</p>
          </div>
        </div>
        <div className={styles.card}>
          <img className='w-14' src={assets.client_icon} alt="" />
          <div>
            <p className={styles.count}>{dashData.clients}</p>
            <p className={styles.category}>Clients</p>
          </div>
        </div>
        <div className={styles.card}>
          <img className='w-14' src={assets.service_icon} alt="" />
          <div>
            <p className={styles.count}>{dashData.services}</p>
            <p className={styles.category}>Services</p>
          </div>
        </div>

      </div>

      <div className='bg-white '>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded border border-gray-200'>
          <img className='w-7' src={assets.list_icon} alt="" />
          <p className='text-lg font-medium'>Latest Bookings</p>
        </div>

        <div className='border border-gray-200 border-t-0'>
          {
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div className='flex flex-wrap justify-between items-center sm:grid sm:grid-cols-[3fr_3.5fr_0.5fr] 
                                        text-gray-500 py-3 px-6 border-b border-b-neutral-300 hover:bg-gray-50 max-sm:gap-2' key={index}>
                <div className='flex items-center gap-2'>
                  <img className='w-12 rounded-full' src={item.userData.image} alt="" />
                  <div className='flex flex-col gap-2'>
                    <p>{item.userData.name}</p>
                    <div className='flex gap-2'>
                      <p>{slotDateFormat(item.slotDate)}</p>
                      <p>|</p>
                      <p>{item.slotStart.toLowerCase() + '-' + item.slotEnd.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-gray-700 font-medium'>{item.serviceData.name}</p>
                  <p>{currencySymbol} {item.price}</p>
                </div>
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
    </div>
  )
}

export default Dashboard