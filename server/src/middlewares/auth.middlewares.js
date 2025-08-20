import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const verifyToken = (role) => async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  
  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);


    if (role && req.user.role !== role) {
      throw new ApiError("Forbidden", 403);
    }
    next();
  } catch (error) {
    console.log(error);

    throw new ApiError("Invalid token", 401);
  }
};

export { verifyToken };
