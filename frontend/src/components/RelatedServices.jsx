import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { getIndicatorAndTextColor } from '../utils/utils';

const RelatedServices = ({ serviceID, category }) => {

    const { servicesData } = useContext(AppContext)
    const [relatedService, setRelatedService] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (servicesData.length > 0 && category) {
            setRelatedService(
                servicesData.filter((service) =>
                    service.category === category && service._id !== serviceID
                )
            )
        }
    }, [servicesData, serviceID, category])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Other Services You Might Like</h1>
            <div className='w-full grid grid-cols-auto gap-6 pt-5 gap-y-6 px-3 sm:px-0'>
                {relatedService.map((item, index) => {
                        const colors = getIndicatorAndTextColor(item.category);
                        return (
                            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 rounded-xl max-w-60 overflow-hidden cursor-pointer
                                            hover:-translate-y-2.5 transition-all duration-500' key={index}>
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
            <button className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full my-10 cursor-pointer'
                onClick={() => { navigate('/services'); scrollTo(0, 0) }}>All Services</button>
        </div>
    )
}

export default RelatedServices