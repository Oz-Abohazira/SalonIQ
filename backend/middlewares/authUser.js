import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, nextFunction) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Must be logged in",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decodedToken.id;

    nextFunction();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { authenticateUser };
