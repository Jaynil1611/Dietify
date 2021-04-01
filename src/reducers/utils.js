const checkItemExist = (list, productId) => {
  const res = list.filter(
    ({ id, status }) =>
      id === productId && (status ? status !== "deleted" : true)
  );
  return res.length > 0 ? true : false;
};

const appendItem = (list, product, wish) => {
  return checkItemExist(list, product.id)
    ? wish === "wish"
      ? removeItem(list, product.id)
      : list
    : list.concat({ ...product, cartQuantity: 1 });
};

const removeItem = (list, productId) => {
  return list.filter(({ id }) => id !== productId);
};

const removeItemFromCartList = (list, productId) => {
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
  }, []);
};

const getFilteredList = (list) => {
  return list.filter(({ status }) => status !== "deleted");
};

export {
  checkItemExist,
  appendItem,
  updateQuantity,
  removeItem,
  removeItemFromCartList,
  getFilteredList,
};
