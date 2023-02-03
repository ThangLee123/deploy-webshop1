const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

const initRouter = require("./routers/router");

// The next 2 lines are to convert all api with body (http request body content) to req.body
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const __dirname1 = path.resolve();
app.use("/uploads", express.static(path.join(__dirname1, "/uploads")));

// console.log("ssssss", path.join(__dirname1, "/frontend/build"));
app.use(express.static(path.join(__dirname1, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname1, "/frontend/build/index.html"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/kltn");

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

// app.get("/api/test", (req, res) => {
//   res.json("Server is ready");
// });

// Routes
initRouter(app);

// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

//express-async-handler npm package (when expressAsyncHandler catch error will go to this middleware )
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const httpServer = http.Server(app);
const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const removeUserById = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  // When connect
  console.log("a user connected.");
  //   io.emit("welcome", "hello this is socket server!");

  // remove user when log out
  socket.on("removeUser", (userId) => {
    removeUserById(userId);
    console.log("online users", users);
    io.emit("getUsers", users);
  });

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("online users", users);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // send and get new Notification rollback order
  socket.on("sendNotify", () => {
    io.emit("getNotify", {});
  });

  // send and get admin watch Notification rollback order
  // socket.on("sendAdminWatchNotifyRollback", () => {
  //   io.emit("getAdminWatchNotifyRollback", {});
  // });

  // send and get new Notification new order create
  socket.on("sendNotifyNewOrder", () => {
    io.emit("getNotifyNewOrder", {});
  });

  // send and get new product comment
  socket.on("sendProductComment", () => {
    io.emit("getProductComment", {});
  });

  // send and get success pay order
  socket.on("sendSuccessPay", () => {
    io.emit("getSuccessPay", {});
  });

  // send and get success deliver
  socket.on("sendSuccessDeliver", () => {
    io.emit("getSuccessDeliver", {});
  });

  // send and get success deliver
  socket.on("sendNotifyHandleRollback", () => {
    io.emit("getNotifyHandleRollback", {});
  });

  // When disconnect
  socket.on("disconnect", () => {
    console.log("someone has left");
    removeUser(socket.id);
    console.log("online users", users);
    io.emit("getUsers", users);
  });
});

const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log("Serve at http://localhost:5000");
// });

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
