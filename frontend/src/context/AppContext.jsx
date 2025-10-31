import { createContext, useEffect, useState } from "react";
import { popularServices, serviceCategories } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [servicesData, setServicesData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(false);

    const currencySymbol = '$'

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const baseServiceUrl = import.meta.env.VITE_SERVICE_BASE_PATH;
    const baseUserUrl = import.meta.env.VITE_USER_BASE_PATH;

    const getAllServices = async () => {
        try {
            const { data } = await axios.get(backendUrl + baseServiceUrl + '/list');

            if (data.success) {
                setServicesData(data.services);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllServices()
    }, [])

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + baseUserUrl + '/get-data', { headers: { token } });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfile();
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        servicesData,
        popularServices,
        serviceCategories,
        currencySymbol,
        token,
        setToken,
        userData,
        setUserData,
        backendUrl,
        baseUserUrl,
        loadUserProfile,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;