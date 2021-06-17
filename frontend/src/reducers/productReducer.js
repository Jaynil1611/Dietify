import { actions } from "./Actions";
import { appendItem, updateQuantity, removeItem } from "../utils";
import { initialState } from "../contexts";

const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case actions.INITIALIZE_LIST:
      return {
        ...prevState,
        [payload.name]: payload.data,
      };
    case actions.ADD_ITEM_TO_WISHLIST:
      return {
        ...prevState,
        wishList: appendItem(prevState.wishList, payload),
      };
    case actions.REMOVE_ITEM_FROM_WISHLIST:
      return {
        ...prevState,
        wishList: removeItem(prevState.wishList, payload.id),
      };
    case actions.ADD_ITEM_TO_CART:
      return {
        ...prevState,
        cartList: appendItem(prevState.cartList, payload),
      };
    case actions.UPDATE_QUANTITY:
      return {
        ...prevState,
        cartList: updateQuantity(prevState.cartList, payload.product),
      };
    case actions.REMOVE_FROM_CART:
      return {
        ...prevState,
        cartList: removeItem(prevState.cartList, payload.id),
      };
    case actions.PRICE_HIGH_TO_LOW:
      return {
        ...prevState,
        sortBy: actions.PRICE_HIGH_TO_LOW,
      };
    case actions.PRICE_LOW_TO_HIGH:
      return {
        ...prevState,
        sortBy: actions.PRICE_LOW_TO_HIGH,
      };
    case actions.FILTER_OUT_OF_STOCK:
      return {
        ...prevState,
        showOutOfStock: !prevState.showOutOfStock,
      };
    case actions.FILTER_FAST_DELIVERY:
      return {
        ...prevState,
        showFastDeliveryOnly: !prevState.showFastDeliveryOnly,
      };
    case actions.CLEAR_ALL_FILTERS:
      return {
        ...prevState,
        sortBy: "",
        search: "",
        showOutOfStock: false,
        showFastDeliveryOnly: false,
        priceRange: 1000,
      };
    case actions.UPDATE_SEARCH_TEXT:
      return {
        ...prevState,
        search: payload,
      };
    case actions.OPEN_OR_CLOSE_TOAST:
      return {
        ...prevState,
        showToast: payload.show,
        toastMessage: payload.text,
      };
    case actions.UPDATE_PRICE_RANGE:
      return {
        ...prevState,
        priceRange: payload.value,
      };
    case actions.UPDATE_USER_DETAILS: {
      const { firstname, lastname } = payload;
      return { ...prevState, firstname, lastname };
    }
    case actions.RESET_STATE: {
      return {
        ...prevState,
        ...initialState,
      };
    }
    default:
      return prevState;
  }
};

export default productReducer;
