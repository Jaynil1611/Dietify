const checkItemExist = (list, productId) => {
  return list.find(
    ({ id, status }) => id === productId && status !== "deleted"
  );
};

const appendItem = (list, product, wish) => {
  if (checkItemExist(list, product.id))
    return wish === "wish" ? removeItem(list, product.id) : list;
  return list.concat({ ...product, cartQuantity: 1 });
};

const removeItem = (list, productId) => {
  return list.map((product) =>
    product.id === productId ? { ...product, status: "deleted" } : product
  );
};

const updateQuantity = (list, productId, incOrDec) => {
  return list.map((product) => {
    const { id, cartQuantity } = product;
    if (id === productId) {
      return incOrDec
        ? { ...product, cartQuantity: cartQuantity + 1 }
        : { ...product, cartQuantity: cartQuantity - 1 };
    }
    return product;
  });
};

export { checkItemExist, appendItem, updateQuantity, removeItem };
