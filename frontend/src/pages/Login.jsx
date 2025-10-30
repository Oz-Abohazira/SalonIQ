import React, { useState } from 'react'

const Login = () => {

  const signUpState = 'SignUp';
  const loginState = 'Login';

  const [state, setState] = useState(signUpState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = async (event) => {
    event.prevantDefault()
  }

  return (
    <form className='min-h-[80vh] flex items-center'
      onSubmit={() => onSubmit()}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === signUpState ? "Create Account" : "Login"}</p>
        <p>{state === signUpState ? "Enjoy Member Benefits for free!" : "Log in to your account"}</p>
        {
          state === signUpState &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" required onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }
        {
          state === signUpState &&
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

        <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-2' type='submit'>
          {state === signUpState ? "Create Account" : "Login"}
        </button>

        <div className=''>
          {
            state === signUpState
              ? <p>Already have an account? <span onClick={() => setState(loginState)} className='text-primary underline cursor-pointer'>Login here</span></p>
              : <p>Don't have an account? <span onClick={() => setState(signUpState)} className='text-primary underline cursor-pointer'>Sign Up here</span></p>
          }
        </div>

      </div>

    </form>
  )
}

export default Login