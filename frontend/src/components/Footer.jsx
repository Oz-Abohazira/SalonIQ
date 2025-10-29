import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const getYear = new Date().getFullYear();

    const navigate = useNavigate();

    return (
        <div className='md: mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>
                {/* ---- Left Section ---- */}
                <div className=''>
                    <img className='mb-5 w-35' src={assets.full_logo_right} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Professional salon management software designed to simplify scheduling, strengthen client relationships, and boost your business growth through smart automation and personalized service.</p>
                </div>

                {/* ---- Center Section ---- */}
                <div>
                    <h2 className='text-xl font-medium mb-5'>Quick Links</h2>
                    <ul className='flex flex-col gap-2 text-gray-800 cursor-pointer'>
                        <li onClick={() => { navigate('/'); scrollTo(0, 0); }} >Home</li>
                        <li onClick={() => { navigate('/services'); scrollTo(0, 0); }}>Services</li>
                        <li onClick={() => { navigate('/about'); scrollTo(0, 0); }}>About Us</li>
                        {/* <li>Contact Us</li> */}
                    </ul>
                </div>

                {/* ---- Right Section ---- */}
                <div>
                    <h2 className='text-xl font-medium mb-5'>Get In Touch</h2>
                    <ul className='flex flex-col gap-3 text-gray-800'>
                        <li className='flex gap-3'>
                            <img className='w-6' src={assets.email_icon} alt="" />
                            <p>hannahbarberbeauty@gmail.com</p>
                        </li>
                        <li className='flex gap-3'>
                            <img className='w-6' src={assets.location_icon} alt="" />
                            <p>Dunwoody, GA 30338</p>
                        </li>
                    </ul>
                </div>

            </div>

            {/* ---- Copyright Text ---- */}
            <div>
                <hr className='text-gray-200' />
                <p className='p-5 text-sm text-center'>Copyright {getYear}@ SalonIQ - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer