import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import AddressAutocomplete from '../components/AddressAutocomplete';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, baseUserUrl, loadUserProfile } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [originalUserData, setOriginalUserData] = useState(userData)

  const [showAddress, setShowAddress] = useState(false);

  const styles = {
    buttonClasses: 'py-2 px-8 rounded-full border border-primary text-gray-800 cursor-pointer hover:bg-primary hover:text-white transition-all',
    subTitle: 'text-neutral-500 underline mt-3 text-base md:text-lg',
    gridLayout: 'grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700',
  }

  const getFormData = () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('phone', userData.phone);
    formData.append('gender', userData.gender);
    formData.append('dob', userData.dob);

    image && formData.append('image', image);

    return formData;
  }

  useEffect(() => {
    if (userData && !originalUserData) {
      setOriginalUserData({
        name: userData.name,
        phone: userData.phone,
        gender: userData.gender,
        dob: userData.dob,
      });
    }
  }, [userData]);

  const hasDataChanged = () => {
    if (!originalUserData) return true;

    // Check basic fields
    if (userData.name !== originalUserData.name ||
      userData.phone !== originalUserData.phone ||
      userData.gender !== originalUserData.gender ||
      userData.dob !== originalUserData.dob) {
      return true;
    }

    // Check if image was changed
    if (image) {
      return true;
    }

    return false;
  };

  const updateUserProfile = async () => {

    try {
      const formData = getFormData();

      if (!hasDataChanged()) {
        toast.info('No changes detected');
        setIsEdit(false);
        return;
      }

      const { data } = await axios.put(backendUrl + baseUserUrl + '/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfile();

        setIsEdit(false);
        setImage(false);
        setOriginalUserData({
          name: userData.name,
          phone: userData.phone,
          gender: userData.gender,
          dob: userData.dob,
        });

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm border border-neutral-300 shadow-md p-6 rounded-xl'>
      {
        isEdit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img onClick={() => { image && setImage(false) }} className=' bg-primary opacity-60 w-8 absolute bottom-0 right-0' 
                  src={assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          : <img className='w-36 rounded' src={userData.image} alt="" />
      }
      <div className='text-3xl font-medium mt-4'>
        {
          isEdit
            ? <input className='w-full border' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} type="text" />
            : <p>{userData.name}</p>
        }
      </div>
      <hr className='w-full bg-zinc-400 h-px border-none' />

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
          {showAddress &&
            <p className='font-medium'>Address:</p>
          }
          {showAddress &&
            (isEdit) ?
            <div className='flex flex-col gap-2'>
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
            : showAddress &&
            <div className='flex flex-col gap-2'>
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
            ? <button onClick={() => updateUserProfile()} className={styles.buttonClasses}>Save</button>
            : <button onClick={() => setIsEdit(true)} className={styles.buttonClasses}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile