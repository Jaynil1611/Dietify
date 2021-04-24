import { handleToast } from "../components";
import { callMockServer } from ".";
import { checkItemExist } from "../reducers";
import { actions } from "../reducers";

const userId = "6082a6790b7e110cb360760e";

const constructURL = () => {
  return `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`;
};

const getRequestObject = (itemExists, product) => {
  return itemExists
    ? {
        type: "post",
        url: `${constructURL()}/wishes/${product.id}`,
        data: { ...product, status: "deleted" },
      }
    : {
        type: "post",
        url: `${constructURL()}/wishes`,
        data: product,
      };
};

const addItemToCart = async (dispatch, product, cartList) => {
  const itemExists = checkItemExist(cartList, product.id);
  if (itemExists) {
    return updateCartItem(dispatch, product);
  }
  const { response, error } = await callMockServer({
    url: `${constructURL()}/cart`,
    type: "post",
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

const updateCartItem = async (dispatch, product) => {
  const { response, error } = await callMockServer({
    url: `${constructURL()}/cart/${product.id}`,
    type: "post",
    data: product,
  });
  if (!error) {
    const {
      data: { cart },
    } = response;
    handleToast(dispatch, "Product Quantity Updated");
    dispatch({
      type: actions.UPDATE_QUANTITY,
      payload: { product: cart },
    });
  } else handleToast(dispatch, "Something is wrong");
};

const addOrRemoveFromWish = async (dispatch, product, wishList) => {
  const itemExists = checkItemExist(wishList, product.id);
  const { response, error } = await callMockServer(
    getRequestObject(itemExists, product)
  );
  if (!error) {
    handleToast(dispatch, "Wishlist Updated");
    dispatch({
      type: actions.ADD_OR_REMOVE_ITEM_TO_WISHLIST,
      payload: { product: response.data.wish, itemExists },
    });
  }
};

const removeFromCart = async (dispatch, product) => {
  const { response, error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/cart/${product.id}`,
    data: { ...product, status: "deleted" },
  });
  if (!error) {
    handleToast(dispatch, "Removed from Cart");
    dispatch({
      type: actions.REMOVE_FROM_CART,
      payload: response.data.cart,
    });
  }
};

export { addItemToCart, addOrRemoveFromWish, removeFromCart, updateCartItem };
