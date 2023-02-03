const { VNPay } = require("vn-payments");
const Order = require("../models/orderModel");
const SellerPay = require("../models/sellerPayModel");
/* eslint-disable no-param-reassign */
const TEST_CONFIG = VNPay.TEST_CONFIG;
const vnpay = new VNPay({
  paymentGateway: TEST_CONFIG.paymentGateway,
  merchant: TEST_CONFIG.merchant,
  secureSecret: TEST_CONFIG.secureSecret,
});

function checkoutVNPay(req, res) {
  const checkoutData = res.locals.checkoutData;

  // checkoutData.returnUrl = `http://${req.headers.host}/paymentvnp/vnpay/callback`;
  checkoutData.returnUrl = `https://${req.headers.host}/paymentvnp/vnpay/callback`;
  checkoutData.orderInfo = "Paid For Order";
  checkoutData.orderType = "fashion";

  return vnpay.buildCheckoutUrl(checkoutData).then((checkoutUrl) => {
    res.locals.checkoutUrl = checkoutUrl;

    return checkoutUrl;
  });
}

const updatedOrder = async (req, res, par) => {
  // console.log("CHECK UPDATE",par);
  const order = await Order.findById(par.transactionId);
  if (order && par && par.isSuccess === true) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: order._id,
      status: true,
      update_time: Date.now(),
      email_address: req.email,
    };
    const updatedOrder = await order.save();
    for (product of updatedOrder.orderItems) {
      const newSellerPayOrder = new SellerPay({
        sellerId: product.seller._id,
        userBuyId: updatedOrder.user,
        orderId: updatedOrder._id,
        productId: product.product,
        productName: product.name,
        productPrice: product.price,
        userBuyQuantity: product.qty,
        totalSellerPrice: product.price * product.qty,
        payMonth: new Date().getMonth() + 1,
        payYear: new Date().getFullYear(),
      });
      const createdSellerPayOrder = await newSellerPayOrder.save();
    }
    // res.send({message:'Order Paid',order:updatedOrder});
  }
  // console.log("LOG ORDER: ", order);
};

function callbackVNPay(req, res) {
  if (req) {
    const query = req.query;

    return vnpay.verifyReturnUrl(query).then((results) => {
      if (results) {
        // res.locals.email = 'tu.nguyen@naustud.io';
        res.locals.orderId = results.transactionId || "";
        res.locals.price = results.amount;
        res.locals.isSucceed = results.isSuccess;
        res.locals.message = results.message;
        updatedOrder(req, res, results);
      } else {
        res.locals.isSucceed = false;
      }
      // console.log("CALL BACK BLA BLA: ",results);
    });
  }
}
module.exports = { checkoutVNPay, callbackVNPay };
