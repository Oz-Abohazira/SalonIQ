import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedServices from '../components/RelatedServices';

const Appointment = () => {

  const { serviceID } = useParams();
  const { servicesData, currencySymbol } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [serviceInfo, setServiceInfo] = useState(null);
  const [serviceSlots, setServiceSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    const fetchServiceData = async () => {
      const serviceData = servicesData.find((service) => {
        return service._id === serviceID
      });
      setServiceInfo(serviceData);
    }

    fetchServiceData()
  }, [servicesData, serviceID])

  useEffect(() => {
    const getAvailableSlots = async () => {
      setServiceSlots([]);

      // Getting current date
      let today = new Date()
      let timeStep = 30  //serviceInfo.durationInMinutes;

      for (let i = 0; i < 10; i++) {
        // Getting date with index
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i);

        // Setting end time (7pm) of the date with index 
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(18, 30, 0, 0);

        // Setting hours
        if (today.getDate() === currentDate.getDate()) {
          let currentHour = currentDate.getHours();
          currentDate.setHours(currentHour >= 11 ? currentHour + 3 : 11)
          currentDate.setMinutes(currentDate.getMinutes() > timeStep ? timeStep : 0);
        } else {
          currentDate.setHours(11);
          currentDate.setMinutes(0);
        }

        let timeSlots = []

        if (currentDate >= endTime) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: '',
          })
        }

        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });
          // Add slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })

          // Increment current time by 30 minutes
          currentDate.setMinutes(currentDate.getMinutes() + timeStep)
        }

        console.log(timeSlots)
        setServiceSlots(prev => ([...prev, timeSlots]))
      }
    }

    getAvailableSlots()

  }, [serviceInfo])

  // useEffect(() => {
  //   console.log(serviceSlots)
  // }, [serviceSlots])

  return serviceInfo && (
    <div>
      {/* ---- Service Details ---- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-68 rounded-lg' src={serviceInfo.image} alt="" />
        </div>
        {/* ---- Service Info: Duration, Price,  */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0'>
          {/* Title */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-900'>
            {serviceInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          {/* Duration */}
          <div className='flex gap-3 mt-1 text-gray-500 text-sm'>
            <img className='w-5' src={assets.clock_icon} alt="" />
            <p>{serviceInfo.duration}</p>
          </div>
          {/* Service Description */}
          <div className='flex flex-col items-baseline gap-1 text-sm mt-4'>
            {/* <img className='w-5' src={assets.info_icon} alt="" /> */}
            <p className='text-xl font-medium text-gray-900'>
              About The Service
            </p>
            <p className='max-w-4/5 text-gray-600'>{serviceInfo.description}</p>
          </div>
          {/* Price */}
          <div className='flex gap-3 mt-4 text-gray-500 text-sm'>
            <p>Price: <span className='text-gray-700'>{currencySymbol + serviceInfo.price} </span>
            </p>
          </div>
        </div>
      </div>

      {/* ---- Booking Slots ---- */}
      <div className='mt-4 font-medium text-gray-700'>
        <p className='text-xl'>Available Times</p>

        {/* Available Dates */}
        <div className='flex gap-5 w-full overflow-x-scroll mt-4'>
          {
            serviceSlots.length && serviceSlots.map((serviceDateTime, index) => (
              <div onClick={() => { setSlotIndex(index); setSlotTime('') }} key={index}
                className={`text-center py-3 min-w-14 rounded-full cursor-pointer 
                         ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300'}`}>
                <p>{serviceDateTime[0] && daysOfWeek[serviceDateTime[0].dateTime.getDay()]}</p>
                <p>{serviceDateTime[0] && serviceDateTime[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>
        {/* Available Times */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            serviceSlots[slotIndex][0].time === ''
              ? <div>No Appointments Available, try selecting another day</div>
              : serviceSlots.length && serviceSlots[slotIndex].map((serviceDateHours, index) => (
                <p onClick={() => setSlotTime(serviceDateHours.time)}
                  className={`text-sm font-light shrink-0 border rounded-2xl p-2 cursor-pointer
                           ${serviceDateHours.time === slotTime ? 'bg-primary text-white' : 'text-gray-800 border-gray-300'}`} key={index}>

                  {serviceDateHours.time.toLowerCase()}
                </p>
              ))
          }
        </div>

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an Appointment</button>
      </div>

      <RelatedServices serviceID={serviceID} category={serviceInfo.category} />
    </div>
  )
}

export default Appointment