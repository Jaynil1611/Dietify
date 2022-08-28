const { productList } = require("./product.data");
const { Product } = require("../models/product.model");

async function storeProducts() {
  try {
    productList.forEach(async (product) => {
      const productToBeSaved = new Product(product);
      const savedProduct = await productToBeSaved.save();
    });
  } catch (error) {
    console.error("Error while saving products to database", error.message);
  }
}

async function createUser() {
  try {
    const user = new User({ username: "diet", password: "diet1234" });
    const savedUser = await user.save();
  } catch (error) {
    console.error("Error while registering user", error.message);
  }
}

module.exports = { storeProducts, createUser };
