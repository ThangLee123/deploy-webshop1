const expressAsyncHandler = require("express-async-handler");
const RollBackOrder = require("../models/rollBackOrderModel");
const Order = require("../models/orderModel");
const SellerPay = require("../models/sellerPayModel");
const Product = require("../models/productModel");

const createOrderRollBack = expressAsyncHandler(async (req, res) => {
  // console.log("aduu", req.user);
  const checkRollbackOrder = await RollBackOrder.find({
    orderId: req.params.orderId,
  }).countDocuments();
  //   console.log("fsdcxv", checkRollbackOrder);
  if (checkRollbackOrder === 0) {
    const updateOrder = await Order.updateOne(
      { _id: req.params.orderId },
      { isRollback: true, isFinishHandleRollback: "Waiting" }
    );
    const rollbackOrder = new RollBackOrder({
      userBuyId: req.user.id,
      orderId: req.params.orderId,
      totalOrderPrice: req.body.totalOrderPrice,
      userPaymentRollBack: req.body.userPaymentRollBack,
      reasonCancel: req.body.reasonCancel,
    });
    const createRollbackOrder = await rollbackOrder.save();
    return res.send({
      message: "RollBack Order Created",
      rollbackOrder: createRollbackOrder,
    });
  }
  return res.status(400).send({ message: "You already send rollback request" });
});

const getAllRollbackOrders = expressAsyncHandler(async (req, res) => {
  // const seller = req.query.seller || "";
  // const sellerFilter = seller ? { seller } : {};
  // console.log("wwwwqe", sellerFilter);
  const pageSize = Number(req.query.itemsPerPage) || 4;
  const page = Number(req.query.pageNumber) || 1;
  const searchValue = req.query.searchValue || "";
  const searchValueRegex = new RegExp(searchValue, "i");

  // console.log("regex", regex);
  // const searchValueFilter = searchValue
  //   ? { paymentMethod: { $regex: regex } }
  //   : {};
  const month = parseInt(req.query.month) - 1;
  const year = parseInt(req.query.year);
  const fromDate = new Date(year, month, 1);
  const toDate = new Date(year, month + 1, 1);
  console.log("fromdata", fromDate.toString());
  console.log("todate", toDate.toString());
  const orders = await RollBackOrder.find({
    // ...sellerFilter, // use to filter before populate
    createdAt: { $gte: fromDate, $lt: toDate },
  })
    .populate({
      path: "orderId",
      select: "createdAt",
    })
    .sort({ createdAt: -1 });

  // use to filter after populate
  const count = orders.filter(
    // similar to order.user.name.includes(searchValue) ||order.paymentMethod.includes(searchValue)
    // but use regex here can check also uppercase and lower case
    (order) =>
      searchValueRegex.test(order.userBuyId) ||
      searchValueRegex.test(order.orderId) ||
      searchValueRegex.test(order._id)
  ).length;
  const orderRollbackReturn = orders
    .filter(
      // similar to order.user.name.includes(searchValue) ||order.paymentMethod.includes(searchValue)
      // but use regex here can check also uppercase and lower case
      (order) =>
        searchValueRegex.test(order.userBuyId) ||
        searchValueRegex.test(order.orderId) ||
        searchValueRegex.test(order._id)
    )
    .slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize);
  // console.log("asas", orderRollbackReturn);
  res.send({
    result: orderRollbackReturn,
    page,
    pages: Math.ceil(count / pageSize),
    totalOrderRollbacksCount: count,
  });
  // res.send(orderRollbackReturn);
});

// api for admin update (params orderId)
// order will be update status
// delete all seller pay by order Id

const updateRollbackOrderByOrderId = expressAsyncHandler(async (req, res) => {
  // console.log("aduu", req.user);
  const updateOrderStatus = await Order.updateOne(
    { _id: req.body.orderId },
    { isFinishHandleRollback: req.body.action }
  );

  if (req.body.action === "Success") {
    const updateRollbackStatus = await RollBackOrder.updateOne(
      { orderId: req.body.orderId },
      { isAdminHandle: true, isAdminAccept: true, adminHandleId: req.user.id }
    );
    const SellerPayByOrderId = await SellerPay.find({
      orderId: req.body.orderId,
    });
    for (sellerPay of SellerPayByOrderId) {
      const product = await Product.findById(sellerPay.productId);
      if (product) {
        product.countInStock = product.countInStock + sellerPay.userBuyQuantity;
      }
      const updateProduct = await product.save();
    }
    const deleteSellerPay = await SellerPay.deleteMany({
      orderId: req.body.orderId,
    });
  } else {
    const updateRollbackStatus = await RollBackOrder.updateOne(
      { orderId: req.body.orderId },
      { isAdminHandle: true, adminHandleId: req.user.id }
    );
  }
  res.send({ message: "Update Order Rollback Successfully!" });
});

const updateAdminWatchOrderRollback = expressAsyncHandler(async (req, res) => {
  // console.log("aduu", req.user);
  const updateRollbackStatus = await RollBackOrder.updateOne(
    { orderId: req.params.orderId },
    { isAdminWatch: true }
  );
  res.send({ message: "Update Order Rollback Successfully!" });
});
module.exports = {
  createOrderRollBack,
  getAllRollbackOrders,
  updateRollbackOrderByOrderId,
  updateAdminWatchOrderRollback,
};
