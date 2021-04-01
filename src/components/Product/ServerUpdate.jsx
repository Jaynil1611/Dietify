import { handleToast } from "../Toast/Toast";
import { callMockServer } from "../../api";
import { checkItemExist } from "../../reducers";
import { Actions } from "../../reducers";

const getRequestObject = (itemExists, product) => {
  return itemExists
    ? {
        type: "put",
        url: `/api/wishes/${product.id}`,
        data: { wish: { ...product, status: "deleted" } },
      }
    : {
        type: "post",
        url: "/api/wishes",
        data: { wish: product },
      };
};

const addItemToCart = async (dispatch, product) => {
  const { response, error } = await callMockServer({
    url: "/api/carts",
    type: "POST",
    data: { cart: product },
  });
  if (!error) {
    handleToast(dispatch, "Cart Updated");
    dispatch({
      type: Actions.ADD_ITEM_TO_CART,
      payload: response.data.cart,
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
      type: Actions.ADD_OR_REMOVE_ITEM_TO_WISHLIST,
      payload: response.data.wish,
    });
  }
};

const removeFromCart = async (dispatch, product) => {
  const { response, error } = await callMockServer({
    type: "put",
    url: `/api/carts/${product.id}`,
    data: { cart: { ...product, status: "deleted" } },
  });
  if (!error) {
    handleToast(dispatch, "Removed from Cart");
    dispatch({
      type: Actions.REMOVE_FROM_CART,
      payload: response.data.cart,
    });
  }
};

export { addItemToCart, addOrRemoveFromWish, removeFromCart };
