import { createContext } from "react";
import { servicesData, popularServices, serviceCategories } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'

    const value = {
        servicesData,
        popularServices,
        serviceCategories,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;