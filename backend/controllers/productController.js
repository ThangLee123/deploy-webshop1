const expressAsyncHandler = require("express-async-handler");
const { data } = require("../data");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const getAllProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.itemsPerPage) || 9;
  const page = Number(req.query.pageNumber) || 1;

  const seller = req.query.seller || "";
  const sellerFilter = seller ? { seller } : {};

  const order = req.query.order || "";
  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : { _id: -1 };

  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};

  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};

  const name = req.query.name || "";
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};

  const category = req.query.category || "";
  const categoryFilter = category ? { category } : {};

  const searchValue = req.query.searchValue || "";
  const searchValueRegex = new RegExp(searchValue, "i");
  const searchValueFilter = searchValue
    ? { name: { $regex: searchValueRegex } }
    : {};
  const count = await Product.count({
    ...sellerFilter,
    ...searchValueFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  const products = await Product.find({
    ...sellerFilter,
    ...searchValueFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate("seller", "seller.name seller.logo email")
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    totalProductsCount: count,
  });
});

const createProductSeed = expressAsyncHandler(async (req, res) => {
  // console.log(data);
  // await User.remove({});
  const seller = await User.findOne({ isSeller: true });
  if (seller) {
    const products = data.products.map((product) => ({
      ...product,
      seller: seller._id,
    }));
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
  } else {
    res
      .status(500)
      .send({ message: "No seller found. first run /api/users/seed" });
  }
});

const getProductById = expressAsyncHandler(async (req, res) => {
  //   const product = await Product.findById(req.params.id).populate(
  //     "seller",
  //     "seller.name seller.logo seller.rating seller.numReviews"
  //   );
  const product = await Product.findById(req.params.id).populate(
    "seller",
    "seller.name seller.logo seller.rating seller.numReviews"
  );
  if (!product) {
    return res.status(404).send({ message: "Product not Found" });
  }
  res.send(product);
});

const productElement = expressAsyncHandler(async (req, res) => {
  // console.log("aduu", req.user);
  const product = new Product({
    name: "sample name " + Date.now(),
    seller: req.user.id,
    image1: "/assets/images/productImage/p6.jpg",
    image2: "/assets/images/productImage/p6.jpg",
    image3: "/assets/images/productImage/p6.jpg",
    price: 0,
    category: "sample category",
    brand: "sample brand",
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createProduct = await product.save();
  res.send({ message: "Product Created", product: createProduct });
});

const editProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (!req.user._id.equals(product.seller._id)) {
      return res
        .status(400)
        .send({ message: "Cannot edit other seller product!" });
    }
    product.name = req.body.name;
    product.price = req.body.price;
    product.image1 = req.body.image1;
    product.image2 = req.body.image2;
    product.image3 = req.body.image3;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({ message: "Product Updated", product: updatedProduct });
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deleteProduct = await product.remove();
    res.send({ message: "Product Deleted", product: deleteProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const createProductReview = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.userId.equals(req.body.userId))) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }
    const review = {
      userId: req.body.userId,
      avatar: req.body.avatar,
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = Math.round(
      product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length
    );
    const updatedProduct = await product.save();

    const sellerInfo = await User.findById(product.seller);
    sellerInfo.seller.numReviews = sellerInfo.seller.numReviews + 1;
    // product.seller.rating = (Number(product.seller.numReviews) + 1).toFixed(1);
    sellerInfo.seller.rating = Math.round(
      (Number(sellerInfo.seller.rating) + Number(req.body.rating)) / 2
    );
    const updatedSeller = await sellerInfo.save();

    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

const getProductListCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct("category");
  // .sort({ createdAt: -1 })
  // .limit(1);
  const result = categories.slice(0, 15);
  // console.log("cxc", result);
  res.send(result);
});

module.exports = {
  createProductSeed,
  getAllProducts,
  getProductById,
  productElement,
  editProduct,
  deleteProduct,
  createProductReview,
  getProductListCategories,
};
