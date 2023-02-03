const orderRollbackRouter = require("express").Router();
const orderRollbackController = require("../controllers/orderRollbackController");

const authMiddle = require("../middlewares/authMiddleware");

orderRollbackRouter.post(
  "/:orderId",
  authMiddle.isAuth,
  orderRollbackController.createOrderRollBack
);
orderRollbackRouter.post(
  "/",
  authMiddle.isAuth,
  orderRollbackController.getAllRollbackOrders
); //m

orderRollbackRouter.put(
  "/:orderId",
  authMiddle.isAuth,
  orderRollbackController.updateAdminWatchOrderRollback
);

orderRollbackRouter.put(
  "/",
  authMiddle.isAuth,
  orderRollbackController.updateRollbackOrderByOrderId
);

// productRouter.post(
//   "/",
//   [authMiddle.isAuth, authMiddle.isSellerOrAdmin],
//   productController.productElement
// );

// productRouter.get("/seed", productController.createProductSeed);
// productRouter.get("/:id", productController.getProductById);

// productRouter.delete(
//   "/:id",
//   [authMiddle.isAuth, authMiddle.isSellerOrAdmin],
//   productController.deleteProduct
// );

module.exports = orderRollbackRouter;
