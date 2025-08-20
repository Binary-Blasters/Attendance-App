import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

export const userController = {
  register: asyncHandler(async (req, res) => {
    const { name, email, userName, password ,role} = req.body;
    if (!name || !email || !userName || !password || !role) {
      throw new ApiError("All fields are required", 400);
    }
    const isExisting = await User.findOne({ $or: [{ email }, { userName }] });
    if (isExisting) throw new ApiError("Email or Username already in use", 400);
    const user = await User.create({ name, email, userName, password ,role});
    return res
      .status(201)
      .json(new ApiResponse("User registered successfully", { user }));
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userName = req.body?.userName;
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) throw new ApiError("Invalid email or password", 401);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError("Invalid email or password", 401);
    const token = user.generateAuthToken();
    await user.save();
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json(new ApiResponse("User logged in successfully", { user: loggedInUser }));
  }),
  logout: asyncHandler(async (req, res) => {
    const user = req.user;
    console.log(user);
    
    await User.findByIdAndUpdate(user._id, { refreshToken: null });
    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now()),
    };
    return res
      .status(200)
      .cookie("token", null, options)
      .json(new ApiResponse("User logged out successfully"));
  }),
  getUserProfile: asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);
    
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return res
      .status(200)
      .json(new ApiResponse("User profile fetched successfully", { user }));
  }),
  updateUserProfile: asyncHandler(async (req, res) => {
    const user = req.user;
    const { name, email, userName } = req.body;
    if (!name || !email || !userName) {
      throw new ApiError("All fields are required", 400);
    }
    user.name = name;
    user.email = email;
    user.userName = userName;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse("User profile updated successfully", { user }));
  }),
};
