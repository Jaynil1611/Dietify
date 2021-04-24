const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const wishlistRouter = require("./routes/wishlist.router");

const { initializeDBConnection } = require("./db/db.connect");
const { createUser } = require("./models/user.model");
const { storeProducts } = require("./models/product.model");

const PORT = process.env.PORT || 3000;

// called before any route handler
initializeDBConnection();

// userId ---> 6082a6790b7e110cb360760e
//once
// createUser();
// storeProducts();

app.use("/products", productRouter);
app.use("/user/:userId/cart", cartRouter);
app.use("/user/:userId/wishes", wishlistRouter);

app.get("/", (request, response) => {
  response.json("Welcome to Dietify Backend");
});

/**
 * 404 Route Handler
 * & Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
