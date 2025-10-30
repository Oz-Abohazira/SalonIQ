import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const signUpState = 'SignUp';
  const loginState = 'Login';

  const navigate = useNavigate()

  const [pageState, setPageState] = useState(signUpState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { token, setToken,
    backendUrl,
    baseUserUrl, } = useContext(AppContext);

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      let data;

      if (pageState === signUpState) {
        const response = await axios.post(backendUrl + baseUserUrl + '/register',
          { name, phone, password, email });
        data = response.data;
      } else {
        // On Login state
        const response = await axios.post(backendUrl + baseUserUrl + '/login',
          { email, password });
        data = response.data;
      }

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(`Welcome Back ${data.name.split(' ')[0]}`, {
          autoClose: 2000,
          position: "top-left",
        });
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    } 
  }, [token])

  return (
    <form className='min-h-[80vh] flex items-center'
      onSubmit={onSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{pageState === signUpState ? "Create Account" : "Login"}</p>
        <p>{pageState === signUpState ? "Enjoy Member Benefits for free!" : "Log in to your account"}</p>
        {
          pageState === signUpState &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" required onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }
        {
          pageState === signUpState &&
          <div className='w-full'>
            <p>Phone Number</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" required onChange={(e) => setPhone(e.target.value)} value={phone} />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base mt-2' >
          {pageState === signUpState ? "Create Account" : "Login"}
        </button>

        <div className=''>
          {
            pageState === signUpState
              ? <p>Already have an account? <span onClick={() => setPageState(loginState)} className='text-primary underline cursor-pointer'>Login</span></p>
              : <p>Don't have an account? <span onClick={() => setPageState(signUpState)} className='text-primary underline cursor-pointer'>Sign Up</span></p>
          }
        </div>

      </div>

    </form>
  )
}

export default Login