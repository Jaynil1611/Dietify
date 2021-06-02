export const checkItemExist = (list, productId) => {
  return list.find(
    ({ id, status }) => id === productId && status !== "deleted"
  );
};

export const appendItem = (list, product) => {
  return list.concat(product);
};

export const removeItem = (list, productId) => {
  return list.filter(({ id }) => id !== productId);
};

export const updateQuantity = (list, updatedProduct) => {
  return list.map((product) => {
    return product.id === updatedProduct.id ? updatedProduct : product;
  });
};
