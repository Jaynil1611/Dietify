const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");

const { initializeDBConnection } = require("./db/db.connect");
const { createUser } = require("./db/dbCreate");
const { storeProducts } = require("./db/dbCreate");

const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const wishlistRouter = require("./routes/wishlist.router");
const userRouter = require("./routes/user.router");
const createUserRouter = require("./routes/createUser.router");
const loginRouter = require("./routes/login.router");
const paymentRouter = require("./routes/payment.router");

const { pathNotFoundHandler } = require("./middlewares/pathNotFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const { authHandler } = require("./middlewares/authHandler");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(compression());

initializeDBConnection();

app.get("/", (req, res) => {
  res.json("Welcome to Dietify Backend");
});

app.use("/products", productRouter);
app.use("/login", loginRouter);
app.use("/users", createUserRouter);
app.use("/payment", paymentRouter);

app.use(authHandler);

app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/wishes", wishlistRouter);

app.use(pathNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
