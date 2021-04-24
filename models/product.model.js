const mongoose = require("mongoose");
const { productList } = require("./product.data");

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  desc: String,
  price: String,
  material: String,
  brand: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  ratings: Number,
  offer: String,
  idealFor: String,
  level: String,
  color: String,
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

async function storeProducts() {
  try {
    productList.forEach(async (product) => {
      const productToBeSaved = new Product(product);
      const savedProduct = await productToBeSaved.save();      
    })
  } catch (error) {
    console.error("Error while saving products to database", error.message);
  }
}

module.exports = { Product, storeProducts }