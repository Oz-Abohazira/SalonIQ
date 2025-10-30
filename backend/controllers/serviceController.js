import serviceModel from "../models/serviceModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { serviceID, newValue } = req.body;

    if (!serviceID || newValue === undefined) {
      console.log(serviceID, newValue);
      console.error("No service ID recieved from frontend");
      return;
    }

    await serviceModel.findByIdAndUpdate(serviceID, {
      available: newValue,
    });

    res.json({ success: true, message: "Availability changed!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getServiceList = async (req, res) => {
  try {
    const services = await serviceModel
      .find({})
      .select(["-date", "-create_date"]);
      
    res.json({ success: true, services });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { changeAvailability, getServiceList };
