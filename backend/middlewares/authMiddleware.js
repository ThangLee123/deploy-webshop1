const jwt = require("jsonwebtoken");
const { getAccessToken } = require("../controllers/authController");
const Users = require("../models/userModel");

// const generateToken = (user) => {
//     return jwt.sign(
//         {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             isSeller: user.isSeller,
//         },
//         process.env.JWT_SECRET || "somethingsecret",
//         {
//             expiresIn: "30d",
//         }
//     );
// };

const isAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // console.log("xcxc", token);
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid Authentication." });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    // console.log("weed", err);
    return res.status(500).json({ msg: err.message });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  //   if (req.user && req.user.isAdmin) {
  if (req.user && user.isAdmin === true) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
const isSeller = async (req, res, next) => {
  const user = await Users.findById(req.user.id);
  // if (req.user && req.user.isSeller) {
  if (req.user && user.isSeller === true) {
    // req.user = user;
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};
const isSellerOrAdmin = async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  // if (req.user && (req.user.isSeller || req.user.isAdmin)) {
  if (req.user && (user.isSeller || user.isAdmin)) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};

module.exports = {
  // generateToken,
  isAuth,
  isAdmin,
  isSeller,
  isSellerOrAdmin,
};
