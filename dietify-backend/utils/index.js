const getNormalizedList = (products) => {
  return products.map((product) => {
    return getNormalizedProduct(product);
  });
};

const getNormalizedProduct = ({ productId, cartQuantity, status }) => {
  return {
    id: productId._id,
    cartQuantity,
    status,
    ...productId._doc,
    _id: undefined,
    __v: undefined,
  };
};

const getNormalizedProductList = (products) => {
  return products.map((product) => {
    return { id: product._id, ...product._doc, __v: undefined, _id: undefined };
  });
};

module.exports = {
  getNormalizedList,
  getNormalizedProduct,
  getNormalizedProductList,
};
