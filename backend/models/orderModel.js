const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image1: { type: String },
        image2: { type: String },
        image3: { type: String },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        seller: {
          seller: {
            name: { type: String },
            logo: { type: String },
            rating: { type: Number },
            numReviews: { type: Number },
          },
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      houseNo: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      note: { type: String },
      //   lat: Number,
      //   lng: Number,
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isRollback: { type: Boolean, default: false },
    isFinishHandleRollback: { type: String, default: "No" }, // Success, Fail
    isWatch: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
