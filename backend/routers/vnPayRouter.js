const vnPayRouter = require("express").Router();
const vnPayController = require("../controllers/vnPayController");

// authRouter.get("/seed", authController.createUserSeed);

vnPayRouter.post("/checkout", vnPayController.checkoutPaymentVNP);
vnPayRouter.post("/:gateway/callback", vnPayController.callbackPaymentVNP); //m
// vnPayRouter.get('/success', (req, res) => {
// 	res.render('result', {
// 		title: 'Nau Store',
// 		isSucceed: true,
// 		email: 'tu.nguyen@naustud.io',
// 		orderId: '6433',
// 		price: '5000000',
// 	});
// });

// vnPayRouter.get('/fail', (req, res) => {
// 	res.render('result', {
// 		title: 'Nau Store',
// 		email: 'tu.nguyen@naustud.io',
// 		orderId: '6433',
// 		price: '5000000',
// 	});
// });

module.exports = vnPayRouter;
