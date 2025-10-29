import { createContext, useEffect, useState } from "react";
import { popularServices, serviceCategories } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [servicesData, setServicesData] = useState([]);

    const currencySymbol = '$'
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const baseUserUrl = import.meta.env.VITE_USER_BASE_PATH;

    const value = {
        servicesData,
        popularServices,
        serviceCategories,
        currencySymbol
    }

    const getAllServices = async () => {
        try {
            const { data } = await axios.get(backendUrl + baseUserUrl + '/list');

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

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;