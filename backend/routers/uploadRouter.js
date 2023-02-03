const multer = require("multer");
const express = require("express");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();
const uploadRouter = require("express").Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

uploadRouter.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
// });

// const s3 = new aws.S3();
// const storageS3 = multerS3({
//     s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     // acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key(req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const uploadS3 = multer({ storage: storageS3 });
// uploadRouter.post("/s3", uploadS3.single("image"), (req, res) => {
//     res.send(req.file.location);
// });

module.exports = uploadRouter;
