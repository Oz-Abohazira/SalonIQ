import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [services, setServices] = useState();
    const [appointments, setAppointments] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const baseAdminPath = import.meta.env.VITE_ADMIN_BASE_PATH;
    const currencySymbol = '$';

    const getAllServices = async () => {
        try {
            const { data } = await axios.get(backendUrl + baseAdminPath + '/all-services',
                { headers: { aToken } });

            if (data.success) {
                setServices(data.services);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const changeAvailability = async (serviceID, newValue) => {
        try {
            const { data } = await axios.put(backendUrl + baseAdminPath + '/change-availability',
                { serviceID, newValue }, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                getAllServices()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + baseAdminPath + '/all-appointments', { headers: { aToken } });

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentID) => {
        try {
            const { data } = await axios.post(backendUrl + baseAdminPath + '/cancel-appointment', { appointmentID }, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                getAllAppointments()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl, baseAdminPath, currencySymbol,
        services, getAllServices, changeAvailability,
        getAllAppointments, appointments, setAppointments,
        cancelAppointment
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;