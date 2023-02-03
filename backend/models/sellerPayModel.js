const mongoose = require("mongoose");

const sellerPaySchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userBuyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    adminPayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productName: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    userBuyQuantity: {
      type: Number,
    },
    totalSellerPrice: {
      type: Number,
    },
    payMonth: { type: Number, required: true },
    payYear: { type: Number, required: true },
    // isUserPay: { type: Boolean, default: false, required: true },
    isAdminPay: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const SellerPay = mongoose.model("SellerPay", sellerPaySchema);
module.exports = SellerPay;
