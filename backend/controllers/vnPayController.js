/* eslint-disable no-param-reassign */

const { Router } = require("express");
const { checkoutVNPay, callbackVNPay } = require("./vnPayHandlers");
const CC = require("currency-converter-lt");
// const routes = Router();

/**
 * GET home page with the mock shopping cart
 */
// routes.get('/', (req, res) => {
// 	res.render('app', { title: 'Nau Store' });
// });

/**
 * GET thank you page
 */
// routes.get('/success', (req, res) => {
// 	res.render('result', {
// 		title: 'Nau Store',
// 		isSucceed: true,
// 		email: 'tu.nguyen@naustud.io',
// 		orderId: '6433',
// 		price: '5000000',
// 	});
// });

// routes.get('/fail', (req, res) => {
// 	res.render('result', {
// 		title: 'Nau Store',
// 		email: 'tu.nguyen@naustud.io',
// 		orderId: '6433',
// 		price: '5000000',
// 	});
// });

const checkoutPaymentVNP = async (req, res) => {
  const userAgent = req.headers["user-agent"];
  // console.log("userAgent", userAgent);

  const params = Object.assign({}, req.body);
  // console.log("ASDF", req.body);
  const clientIp =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  let currencyConverter = new CC({
    from: "USD",
    to: "VND",
    amount: params.amount,
    isDecimalComma: true,
  });
  const exchange = currencyConverter.convert().then((response) => {
    return response;
  });
  const a = await exchange;
  // const amount = parseInt(params.amount.replace(/,/g, ''), 10);
  const amount = a * Math.pow(10, 6);

  const now = new Date();

  // NOTE: only set the common required fields and optional fields from all gateways here, redundant fields will invalidate the payload schema checker
  const checkoutData = {
    amount,
    clientIp: clientIp.length > 15 ? "127.0.0.1" : clientIp,
    locale: "vn",
    billingCity: params.billingCity || "",
    billingPostCode: params.billingPostCode || "",
    billingStateProvince: params.billingStateProvince || "",
    billingStreet: params.billingStreet || "",
    billingCountry: params.billingCountry || "",
    deliveryAddress: params.billingStreet || "",
    deliveryCity: params.billingCity || "",
    deliveryCountry: params.billingCountry || "",
    currency: "VND",
    deliveryProvince: params.billingStateProvince || "",
    customerEmail: params.email,
    customerPhone: params.phoneNumber,
    orderId: params.orderId,
    // returnUrl: ,
    transactionId: params.orderId, // same as orderId (we don't have retry mechanism)
    customerId: params.email,
  };

  // pass checkoutData to gateway middleware via res.locals
  res.locals.checkoutData = checkoutData;

  // Note: these handler are asynchronous
  let asyncCheckout = null;
  asyncCheckout = checkoutVNPay(req, res);

  if (asyncCheckout) {
    asyncCheckout
      .then((checkoutUrl) => {
        // res.writeHead(301, { Location: checkoutUrl.href });
        // res.end();
        // console.log("server link:", checkoutUrl.href)
        // res.json({forwardLink: checkoutUrl.href});
        res.json({ status: 301, forwardLink: checkoutUrl.href });
        // res.status(301).send(checkoutUrl.href)
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    res.send("Payment method not found");
  }
};

const callbackPaymentVNP = (req, res) => {
  const gateway = req.params.gateway;
  // console.log("gateway", req.params.gateway);
  let asyncFunc = null;
  asyncFunc = callbackVNPay(req, res);
  if (asyncFunc) {
    asyncFunc
      .then(() => {
        //   res.send({
        //     title: `Nau Store Payment via ${gateway.toUpperCase()}`,
        //     isSucceed: res.locals.isSucceed,
        //     // email: res.locals.email,
        //     orderId: res.locals.orderId,
        //     price: res.locals.price,
        //     message: res.locals.message,
        //     billingStreet: res.locals.billingStreet,
        //     billingCountry: res.locals.billingCountry,
        //     billingCity: res.locals.billingCity,
        //     billingStateProvince: res.locals.billingStateProvince,
        //     billingPostalCode: res.locals.billingPostalCode
        //   });
        // console.log("RESPONSE:", res.locals.isSucceed);

        if (res.locals.isSucceed) {
          // res.redirect(`http://localhost:3000/order/${res.locals.orderId}`);
          // res.status(200).send({ success: true });
          res.send("<script>window.close();</script > ");
          return;
        } else res.redirect("https://webshop-app.onrender.com/shipping");
        return;
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    res.send("No callback found");
  }
};
// routes.post('/payment/checkout', checkoutPayment);

// routes.get('/payment/:gateway/callback', callbackPayment);

module.exports = { callbackPaymentVNP, checkoutPaymentVNP };
