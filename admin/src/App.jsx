import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllAppointments from './pages/AllAppointments';
import AddService from './pages/AddService';
import ServiceList from './pages/ServiceList';

const App = () => {

  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} ></Route>
          <Route path='/dashboard' element={<Dashboard />} ></Route>
          <Route path='/all-appointments' element={<AllAppointments />} ></Route>
          <Route path='/add-service' element={<AddService />} ></Route>
          <Route path='/service-list' element={<ServiceList />} ></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App