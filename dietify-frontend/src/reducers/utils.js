const checkItemExist = (list, productId) => {
  return list.find(
    ({ id, status }) => id === productId && status !== "deleted"
  );
};

const appendItem = (list, product) => {
  return list.concat(product);
};

const removeItem = (list, productId) => {
  return list.filter(({ id }) => id !== productId);
};

const updateQuantity = (list, updatedProduct) => {
  return list.map((product) => {
    return product.id === updatedProduct.id ? updatedProduct : product;
  });
};

export { checkItemExist, appendItem, updateQuantity, removeItem };
