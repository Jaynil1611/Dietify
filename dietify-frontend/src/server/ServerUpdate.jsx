import { handleToast } from "../components";
import { callMockServer } from ".";
import { checkItemExist } from "../reducers";
import { actions } from "../reducers";

const userId = "6082a6790b7e110cb360760e";

const constructURL = () => {
  return `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`;
};

const addOrRemoveFromWish = async (dispatch, product, wishList) => {
  const itemExists = checkItemExist(wishList, product.id);
  if (itemExists) {
    return removeFromWish(dispatch, product);
  }
  const { response, error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/wishes`,
    data: product,
  });
  if (!error) {
    handleToast(dispatch, "Wishlist Updated");
    dispatch({
      type: actions.ADD_ITEM_TO_WISHLIST,
      payload: response.data.wish,
    });
  }
};

const removeFromWish = (dispatch, product) => {
  const { error } = callMockServer({
    type: "delete",
    url: `${constructURL()}/wishes/${product.id}`,
  });
  if (!error) {
    handleToast(dispatch, "Wishlist Updated");
    dispatch({
      type: actions.REMOVE_ITEM_FROM_WISHLIST,
      payload: { id: product.id },
    });
  }
};

const addItemToCart = async (dispatch, product, cartList) => {
  const itemExists = checkItemExist(cartList, product.id);
  if (itemExists) {
    return updateCartItem(dispatch, product);
  }
  const { response, error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/cart`,
    data: { ...product, cartQuantity: 1 },
  });
  if (!error) {
    handleToast(dispatch, "Cart Updated");
    dispatch({
      type: itemExists ? actions.REMOVE_FROM_CART : actions.ADD_ITEM_TO_CART,
      payload: response.data.cart,
    });
  } else handleToast(dispatch, "Something is wrong");
};

const updateCartItem = async (dispatch, product) => {
  const { response, error } = await callMockServer({
    url: `${constructURL()}/cart/${product.id}`,
    type: "post",
    data: product,
  });
  if (!error) {
    handleToast(dispatch, "Product Quantity Updated");
    dispatch({
      type: actions.UPDATE_QUANTITY,
      payload: { product: response.data.cart },
    });
  } else handleToast(dispatch, "Something is wrong");
};

const removeFromCart = async (dispatch, product) => {
  const { error } = await callMockServer({
    type: "delete",
    url: `${constructURL()}/cart/${product.id}`,
  });
  if (!error) {
    handleToast(dispatch, "Removed from Cart");
    dispatch({
      type: actions.REMOVE_FROM_CART,
      payload: { id: product.id },
    });
  } else handleToast(dispatch, "Something is wrong");
};

export { addItemToCart, addOrRemoveFromWish, removeFromCart, updateCartItem };
