const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); //for password hiding
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name should not exceed 30 characters"],
      minLength: [4, "Name should be greater than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be at least 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// compare Password
userSchema.methods.comaparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
