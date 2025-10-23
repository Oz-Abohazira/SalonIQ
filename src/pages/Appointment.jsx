import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Appointment = () => {

  const { serviceID } = useParams();
  const { servicesData } = useContext(AppContext);

  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    const fetchServiceInfo = async () => {
      const serviceInfo = servicesData.find((service) => {
        return service._id === serviceID
      });
      setServiceData(serviceInfo);
    }

    fetchServiceInfo()
  }, [servicesData, serviceID])

  return serviceData && (
    <div>
      {/* ---- Service Details ---- */}
      <div>
        <div>
          <img src={serviceData.image} alt="" />
        </div>
        <div>
          {/* ---- Service Info: Duration, Price,  */}
        </div>
      </div>
    </div>
  )
}

export default Appointment