const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name!"] },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
    },
    password: { type: String, required: [true, "Please enter your password!"] },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
      required: true,
    },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: { type: String, default: "Your Seller Name", required: true },
      logo: {
        type: String,
        default:
          "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
        required: true,
      },
      paymentSalaryMethod: { type: String },
      description: { type: String, default: "You are Best Seller" },
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
