import React, { useState } from 'react'
import { assets } from '../assets/assets';
import AddressAutocomplete from '../components/AddressAutocomplete';

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "4306 N Shallowford Rd",
      line2: "Apt 2304",
      city: "Atlanta",
      state: "GA",
      zipCode: 30341,
    },
    gender: "Male",
    dob: '2000-05-20',
  });

  const [isEdit, setIsEdit] = useState(false);

  const styles = {
    buttonClasses: 'py-2 px-8 rounded-full border border-primary text-gray-800 cursor-pointer hover:bg-primary hover:text-white transition-all',
    subTitle: 'text-neutral-500 underline mt-3 text-base md:text-lg',
    gridLayout: 'grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700',
  }

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm border border-neutral-300 shadow-md p-6 rounded-xl'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      <div className='text-3xl font-medium mt-4'>
        {
          isEdit
            ? <input className='w-md border' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} type="text" />
            : <p>{userData.name}</p>
        }
      </div>
      <hr className='w-md bg-zinc-400 h-px border-none' />

      <div>
        <p className={styles.subTitle}>Contact Information</p>

        <div className={styles.gridLayout}>
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500'> {userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} type="text" />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <div className='flex flex-col gap-2'>
                {/* <AddressAutocomplete
                  value={userData.address.line1}
                  country="us" // optional
                  onSelect={(addr) => setUserData(prev => ({ ...prev, address: { ...prev.address, ...addr } }))}
                /> */}
                <div className='flex gap-2'>
                  <input className='bg-gray-100' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                  <input className='bg-gray-100' value={userData.address.line2 || ''} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
                </div>
                <div className='flex gap-2'>
                  <input className='bg-gray-100' value={userData.address.city || ''} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))} type="text" />
                  <input className='bg-gray-100' value={userData.address.state || ''} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))} type="text" />
                  {/* <input value={userData.address.zipCode || ''} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, zipCode: e.target.value } }))} type="text" /> */}
                </div>
              </div>
              : <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <p className='w-1/2 text-gray-500'>{userData.address.line1}</p>
                  <p className='w-1/2 text-gray-500'>{userData.address.line2}</p>
                </div>
                <div className='flex gap-2'>
                  <p className='text-gray-500'>{userData.address.city}</p>
                  <p className='text-gray-500'>{userData.address.state}</p>
                </div>
              </div>
          }
        </div>
      </div>

      <div>
        <p className={styles.subTitle}>Basic Information</p>
        <div className={styles.gridLayout}>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-500'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-30 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} type="date" value={userData.dob} />
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-8'>
        {
          isEdit
            ? <button onClick={() => setIsEdit(false)} className={styles.buttonClasses}>Save</button>
            : <button onClick={() => setIsEdit(true)} className={styles.buttonClasses}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile