const expressAsyncHandler = require("express-async-handler");
const { data } = require("../data");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUserSeed = expressAsyncHandler(async (req, res) => {
  // await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

const userProfileDetail = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const userProfileUpdate = expressAsyncHandler(async (req, res) => {
  // console.log('bug vai shit',req.user);
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.paymentSalaryMethod =
        req.body.sellerPayment || user.seller.paymentSalaryMethod;
      user.seller.description =
        req.body.sellerDescription || user.seller.description;
    }
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 12);
    }
    const updateUser = await user.save();
    res.send({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      avatar: updateUser.avatar,
      isAdmin: updateUser.isAdmin,
      isSeller: updateUser.isSeller,
      // token: generateToken(updateUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const getUsers = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.itemsPerPage) || 6;
  const page = Number(req.query.pageNumber) || 1;

  const searchValue = req.query.searchValue || "";
  const searchValueRegex = new RegExp(searchValue, "i");

  // console.log("regex", regex);
  // const searchValueFilter = searchValue
  //   ? {
  //       $or: [
  //         { name: { $regex: searchValueRegex } },
  //         { email: { $regex: searchValueRegex } },
  //       ],
  //     }
  //   : {};
  // const users = await User.find({ ...searchValueFilter });
  // const count = await User.count({});
  const users = await User.find({});
  // .skip(pageSize * (page - 1))
  // .limit(pageSize);
  const count = users.filter(
    (user) =>
      searchValueRegex.test(user._id) ||
      searchValueRegex.test(user.name) ||
      searchValueRegex.test(user.email)
  ).length;
  const resultFilter = users
    .filter(
      (user) =>
        searchValueRegex.test(user._id) ||
        searchValueRegex.test(user.name) ||
        searchValueRegex.test(user.email)
    )
    .slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize); // can replace skip and limit (dòng 71,73,74)
  // console.log("ress", count);
  res.send({
    resultFilter,
    page,
    pages: Math.ceil(count / pageSize),
    totalUsersCount: count,
  });
});

const editUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.isSeller =
    //   req.body.isSeller === user.isSeller ? user.isSeller : req.body.isSeller;
    // user.isAdmin =
    //   req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;
    user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400).send({ message: "Cannot Delete Admin User" });
      return;
    }
    const deleteUser = await user.remove();
    res.send({ message: "User Deleted", user: deleteUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

module.exports = {
  createUserSeed,
  userProfileDetail,
  userProfileUpdate,
  getUsers,
  editUser,
  deleteUser,
};
