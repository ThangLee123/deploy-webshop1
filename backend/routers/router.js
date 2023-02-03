// const authRouter = require('./auth.router')

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const authRouter = require("./authRouter");
const orderRouter = require("./orderRouter");
const orderRollbackRouter = require("./orderRollbackRouter");
const vnPayRouter = require("./vnPayRouter");
const uploadRouter = require("./uploadRouter");
module.exports = (app) => {
  app.use("/api/uploads", uploadRouter);
  app.use("/api/users", authRouter),
    app.use("/api/users", userRouter),
    app.use("/api/products", productRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/orderRollback", orderRollbackRouter);
  app.use("/paymentvnp", vnPayRouter);
  app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
  });
};
