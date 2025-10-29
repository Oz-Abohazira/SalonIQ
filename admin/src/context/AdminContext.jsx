import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [services, setServices] = useState();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const baseAdminPath = import.meta.env.VITE_ADMIN_BASE_PATH;

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

    const value = {
        aToken, setAToken,
        backendUrl, baseAdminPath,
        services, getAllServices, changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;