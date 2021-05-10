const express = require("express");
const bodyParser = require("body-parser");
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
const { createUser } = require("./db/dbCreate");
const { storeProducts } = require("./db/dbCreate");

const PORT = process.env.PORT || 5000;

initializeDBConnection();

// userId ---> 6082a6790b7e110cb360760e
//once
// createUser();
// storeProducts();

app.use("/products", productRouter);
app.use("/user/:userId/cart", cartRouter);
app.use("/user/:userId/wishes", wishlistRouter);

app.get("/", (req, res) => {
  res.json("Welcome to Dietify Backend");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

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
