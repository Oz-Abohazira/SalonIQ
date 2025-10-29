import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

const ServiceList = () => {

  const getIndicatorAndTextColor = (category) => {
    switch (category) {
      case "Haircut":
        return {
          indicator: "bg-blue-500",
          text: "text-blue-500",
        };
      case "Style":
        return {
          indicator: "bg-pink-500",
          text: "text-pink-500",
        };
      case "Color":
        return {
          indicator: "bg-green-500",
          text: "text-green-500",
        };
      default:
        return {
          indicator: "bg-gray-500",
          text: "text-gray-500",
        };
    }
  };

  const { services, aToken, getAllServices, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllServices()
    }
  }, [aToken])


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <div className='w-full flex flex-wrap gap-8 pt-5 gap-y-6'>
        {
          services && services.map((item, index) => (
            
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500' key={index}>
              <img className='bg-indigo-50 transition-all duration-300 h-56' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.category}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => {changeAvailability(item._id, !item.available)}} type="checkbox" checked={item.available} />
                  <p>Service is Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ServiceList