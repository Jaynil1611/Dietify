const mongoose = require("mongoose");
const { opts } = require("../utils/schemaOptions");
require("mongoose-type-url");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: "Product Name is required" },
    image: {
      type: mongoose.SchemaTypes.Url,
      required: "Product Image is required",
    },
    desc: { type: String, required: "Product Description is required" },
    price: { type: String, required: "Product Price is required" },
    brand: { type: String, required: "Product Brand is required" },
    inStock: { type: Boolean, required: "Product Instock is required" },
    fastDelivery: {
      type: Boolean,
      required: "Product Fastdelivery is required",
    },
    ratings: { type: Number, required: "Product Ratings is required" },
    offer: { type: String, required: "Product Offer is required" },
    asinId: { type: String, required: "Product AsinId is required" },
  },
  opts
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
