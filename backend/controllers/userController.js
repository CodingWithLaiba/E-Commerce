const ErrorHandler = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const sendtoken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample id",
      url: "profilepicUrl",
    },
  });
  sendtoken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email & Password", 401));
  }
  const isPasswordMatched = await user.comaparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email & Password", 401));
  }
  sendtoken(user, 200, res);
});
//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
//Forget Password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // Get ResetPasword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested rhis email then, please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 404));
  }
});
