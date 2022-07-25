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
  sendToken(user, 201, res);
});

module.exports = {
  registerUser,
};
