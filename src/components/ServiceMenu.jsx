import React from 'react'
import { serviceCategories, servicesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { getSlugFromServiceName } from '../utils/utils'

const ServiceMenu = () => {

    return (
        <div id="service-type" className='flex flex-col items-center gap-4 py-16 text-gray-800'>
            <h1 className='text-3xl font-medium'>I Am Interested In Getting</h1>
            {/* <p className='sm:w-1/3 text-center text-sm'>Take a look through our wide selection of services.<br />
                Whether you've got something in mind or need a little guidance, we'll help you decide with confidence.</p> */}

            <div className='flex flex-wrap sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                {serviceCategories.map((item, index) => (
                    <Link className='flex flex-col items-center text-xs px-5 cursor-pointer shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                        to={`/services/${getSlugFromServiceName(item.name)}`} key={index}
                        onClick={() => { scrollTo(0, 0) }}>
                        <img className='w-24 sm:w-30 mb-2 rounded-full border border-primary' src={item.image} alt="" />
                        <p>{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ServiceMenu