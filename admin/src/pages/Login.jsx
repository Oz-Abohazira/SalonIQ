import React from 'react';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const Login = () => {
    const inputStyle = 'border border-[#DADADA] rounded w-full p-2 mt-1';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl, basePath } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            // Call Login API
            const fullLoginPath = backendUrl + basePath + '/login';
            const { data } = await axios.post(fullLoginPath, { email, password })

            if (data.success) {
                localStorage.setItem('aToken', data.token);
                setAToken(data.token);
            } else {
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>Admin</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} className={inputStyle} type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} className={inputStyle} type="password" required />
                </div>
                <button className='w-full py-2 bg-primary text-base text-white rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
    )
}

export default Login