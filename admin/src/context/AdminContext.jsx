import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const basePath = import.meta.env.VITE_ADMIN_BASE_PATH;

    const value = {
        aToken, setAToken,
        backendUrl, basePath,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;