import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = ({ showMargin = false, ctaAppointment = false }) => {

    const navigate = useNavigate();

    return (
        <div className={`flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-18 mb-20
                        ${showMargin ? 'mx-10' : ''}`}>
            {/* Left Side */}
            <div className='flex-1 py-8 sm:py-8 md:py-12 lg:py-16 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p className='mt-3'>
                        {
                            ctaAppointment
                                ? 'Book an Appointment with me today!'
                                : 'Want Special Discounts and Products?'
                        }
                    </p>
                    <p className='mt-3'>
                        {
                            ctaAppointment
                                ? '10% off for first timers'
                                : 'Sign Up Today !'
                        }
                    </p>
                </div>
                <button onClick={ctaAppointment
                    ? () => { navigate('/services') }
                    : () => { navigate('/login'); scrollTo(0, 0) }
                } className='cursor-pointer bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full my-6 hover:scale-105 transition-all'>
                    {ctaAppointment
                        ? 'See All Services'
                        : 'Create Account'
                    }
                </button>

            </div>

            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0' src={assets.banner} alt="" />
            </div>

        </div>
    )
}

export default Banner