import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { getIndicatorAndTextColor } from '../utils/utils';

const Services = () => {

  const categoryName = useParams();
  const { serviceCategories, servicesData } = useContext(AppContext);

  const [filterService, setFilterService] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const applyFilter = () => {
      if (categoryName.type) {
        setFilterService(servicesData.filter(service => service.category.toLowerCase() === categoryName.type));
      } else {
        setFilterService(servicesData);
      }
    }

    applyFilter()
  }, [servicesData, categoryName.type])

  return (
    <div>
      <p className='text-gray-600 '>Categories</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`${showFilter ? 'bg-primary text-white' : ''} py-1 px-3 border rounded text-sm transition-all sm:hidden`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>
        <div className={`${showFilter ? 'flex' : 'hidden sm:flex'}  flex-col gap-3 text-sm text-gray-600`}>
          {serviceCategories.map((item, index) => (
            <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
                           ${categoryName.type === item.name.toLowerCase() ? "bg-indigo-100 text-black" : ""}`}
              onClick={() => categoryName.type === item.name.toLowerCase() ? navigate('/services') : navigate(`/services/${item.name.toLowerCase()}`)} key={index}> {item.name}</p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterService.map((item, index) => {
            const colors = getIndicatorAndTextColor(item.category);
            return (
              <div onClick={() => { navigate(`/appointment/${item._id}`) }} className='border border-blue-200 rounded-xl max-w-60 overflow-hidden cursor-pointer
                                              hover:translate-y-2.5 transition-all duration-500' key={index}>
                <img className='bg-blue-50 h-60' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center'>
                    <p className={`w-2 h-2 rounded-full ${colors.indicator}`}></p>
                    <p className={`${colors.text} font-medium`}>{item.category}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>Recommended {item.repeatEvery}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Services