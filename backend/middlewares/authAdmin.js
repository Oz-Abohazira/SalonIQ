import jwt from "jsonwebtoken";

const authenticateAdmin = async (req, res, nextFunction) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Must be logged in as Admin",
      });
    }

    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Must be logged in as Admin",
      });
    }

    nextFunction();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { authenticateAdmin };
