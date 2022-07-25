const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const sendEmail = require("../utils/mail.util");
const sendToken = require("../utils/token");
const ErrorHander = require("../helper/errorHandler");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const registerUser = asyncHandler(async (req, res, next) => {
  const file = req.files.avatar;
  const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "avatars",
    public_id: `${Date.now()}`,
    width: 150,
    crop: "scale",
    resource_type: "auto",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  await sendToken(user, 201, res);
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(
      new Error("You must enter an email address.", StatusCodes?.BAD_REQUEST)
    );
  }

  if (!password) {
    return next(
      new Error("You must enter a password", StatusCodes?.BAD_REQUEST)
    );
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(
      new Error(
        "No user found for this email  and password",
        StatusCodes?.UNAUTHORIZED
      )
    );
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new Error("Password is incorrect", StatusCodes?.UNAUTHORIZED));
  }

  await sendEmail(email, "login", "", user.name, '');
  await sendToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
};
