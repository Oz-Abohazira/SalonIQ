import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddService = () => {

  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [repeatEvery, setRepeatEvery] = useState('');
  const [duration, setDuration] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState(0);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const { backendUrl, baseAdminPath, aToken } = useContext(AdminContext)

  const categoryTypes = ['Haircut', 'Color', 'Style'];
  const styles = {
    inputDivStyle: 'flex flex-1 flex-col gap-1',
    inputStyle: 'rounded px-3 py-2 border border-neutral-200',
    selectStyle: 'rounded px-3 py-2 border-2 border-blue-400 focus:border-blue-600 focus:outline-none bg-white'
  }

  const clearFormData = () => {
    setImage(false);
    setName('');
    setCategory('');
    setRepeatEvery('');
    setDuration('');
    setDurationInMinutes(0);
    setPrice('');
    setDescription('');
  }

  const getFormData = () => {
    const formData = new FormData();

      formData.append('image', image);
      formData.append('name', name);
      formData.append('category', category);
      formData.append('repeatEvery', repeatEvery);
      formData.append('duration', duration);
      formData.append('durationInMinutes', durationInMinutes);
      formData.append('price', price);
      formData.append('description', description);

      return formData;
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      if (!image) {
        return toast.error('Please Upload an Image');
      }

      const formData = getFormData();

      const { data } = await axios.post(backendUrl + baseAdminPath + '/add-service',
        formData,
        { headers: { aToken } });

      if (data.success) {
        toast.success(data.message);
        clearFormData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className='m-5 w-full'>
      {/* <p className='mb-3 text-lg font-medium'>Add a Service</p> */}

      <div className='bg-white px-8 py-8 border border-neutral-200 rounded w-full max-w-4xl max-h-[90vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="service-image">
            <img className='w-18 bg-gray-100 rounded-full cursor-pointer'
              src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} id='service-image' type="file" hidden />
          <p>Upload Service Image</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className={styles.inputDivStyle}>
              <p>Name</p>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className={styles.inputStyle} type="text" placeholder='What do you call the service' required />
            </div>

            <div className={styles.inputDivStyle}>
              <p>Category</p>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`${styles.inputStyle} w-full text-left flex justify-between items-center`}
                >
                  <span className={category ? "text-gray-700" : "text-gray-400"}>
                    {category || "Select Category"}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {categoryTypes.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setCategory(item);
                          setIsOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.inputDivStyle}>
              <p>How Often Should You Get</p>
              <input value={repeatEvery} onChange={(e) => setRepeatEvery(e.target.value)}
                className={styles.inputStyle} type="text" placeholder='Every Month' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className={styles.inputDivStyle}>
              <p>Duration Text</p>
              <input value={duration} onChange={(e) => setDuration(e.target.value)}
                className={styles.inputStyle} type="text" placeholder='Up to 2 Hours' required />
            </div>

            <div className={styles.inputDivStyle}>
              <p>Duration In Minutes</p>
              <input value={durationInMinutes} onChange={(e) => setDurationInMinutes(e.target.value)}
                className={styles.inputStyle} type="number" placeholder='120' required />
            </div>

            <div className={styles.inputDivStyle}>
              <p>Price</p>
              <input value={price} onChange={(e) => setPrice(e.target.value)}
                className={styles.inputStyle} type="text" placeholder='50 / 50 every gram' required />
            </div>
          </div>
        </div>

        <div className={`${styles.inputDivStyle} mt-4`}>
          <p>Description</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            className={styles.inputStyle} placeholder='Describe this service for a client' rows={5} required />
        </div>

        <button type='submit' className='bg-primary text-white px-10 py-3 mt-4 rounded cursor-pointer'>Add Service</button>
      </div>
    </form>
  )
}

export default AddService