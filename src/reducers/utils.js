const checkItemExist = (list, productId) => {
  return list.find(
    ({ id, status }) => id === productId && status !== "deleted"
  );
};

const appendItem = (list, product, itemExists) => {
  return itemExists ? removeItem(list, product.id) : list.concat(product);
};

const removeItem = (list, productId) => {
  return list.map((product) =>
    product.id === productId ? { ...product, status: "deleted" } : product
  );
};

const updateQuantity = (list, updatedProduct) => {
  return list.map((product) => {
    return product.id === updatedProduct.id ? updatedProduct : product;
  });
};

export { checkItemExist, appendItem, updateQuantity, removeItem };
