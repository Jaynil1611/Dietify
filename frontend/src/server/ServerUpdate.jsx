import { handleToast } from "../components";
import { callMockServer } from ".";
import { checkItemExist } from "../reducers";
import { actions } from "../reducers";

export const constructURL = () => {
  return `${process.env.REACT_APP_BACKEND_URL}`;
};

export const addOrRemoveFromWish = async (dispatch, product, wishList) => {
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

export const removeFromWish = (dispatch, product) => {
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

export const addItemToCart = async (dispatch, product, cartList) => {
  const itemExists = checkItemExist(cartList, product.id);
  if (itemExists) return;
  const { response, error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/cart`,
    data: { ...product, cartQuantity: 1 },
  });
  if (!error) {
    handleToast(dispatch, "Cart Updated");
    dispatch({
      type: actions.ADD_ITEM_TO_CART,
      payload: response.data.cart,
    });
  } else handleToast(dispatch, "Something is wrong");
};

export const updateCartItem = async (dispatch, product) => {
  const { id, cartQuantity } = product;
  const { response, error } = await callMockServer({
    url: `${constructURL()}/cart/${id}`,
    type: "post",
    data: { cartQuantity },
  });
  if (!error) {
    handleToast(dispatch, "Product Quantity Updated");
    dispatch({
      type: actions.UPDATE_QUANTITY,
      payload: { product: response.data.cart },
    });
  } else handleToast(dispatch, "Something is wrong");
};

export const removeFromCart = async (dispatch, product) => {
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

export const signUpUser = async ({
  dispatch,
  firstname,
  lastname,
  email,
  password,
}) => {
  const { error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/users`,
    data: { firstname, lastname, email, password },
  });
  if (!error) {
    handleToast(dispatch, "Sign up successful");
    return true;
  }
  handleToast(dispatch, "Sign up failed!");
  return false;
};

export const getUserDetails = async (dispatch) => {
  const { response, error } = await callMockServer({
    type: "get",
    url: `${constructURL()}/users/user`,
  });
  if (!error) {
    const { firstname, lastname } = response?.data.user;
    dispatch({
      type: actions.UPDATE_USER_DETAILS,
      payload: { firstname, lastname },
    });
  }
};

export const clearCart = async (dispatch) => {
  const { error } = await callMockServer({
    type: "delete",
    url: `${constructURL()}/cart`,
  });
  if (!error) {
    dispatch({
      type: actions.CLEAR_USER_CART,
    });
  }
};
