const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const authMiddle = require("../middlewares/authMiddleware");

userRouter.post("/seed", userController.createUserSeed); //m

userRouter.post("/:id", userController.userProfileDetail); //m

userRouter.put("/profile", authMiddle.isAuth, userController.userProfileUpdate);

userRouter.post(
  "/",
  [authMiddle.isAuth, authMiddle.isAdmin],
  userController.getUsers
); //m

userRouter.put(
  "/:id",
  [authMiddle.isAuth, authMiddle.isAdmin],
  userController.editUser
);

userRouter.delete(
  "/:id",
  [authMiddle.isAuth, authMiddle.isAdmin],
  userController.deleteUser
);

module.exports = userRouter;
