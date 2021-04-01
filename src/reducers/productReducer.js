import { Actions } from "./Actions";
import { appendItem, updateQuantity, removeItem } from "./utils";

const productReducer = (prevState, action) => {
  switch (action.type) {
    case Actions.INITIALIZE_PRODUCTS:
      return {
        ...prevState,
        productList: action.payload
      };
    case Actions.INITIALIZE_WISH:
      return {
        ...prevState,
        wishList: action.payload
      };
    case Actions.INITIALIZE_CART:
      return {
        ...prevState,
        cartList: action.payload
      };
    case Actions.ADD_OR_REMOVE_ITEM_TO_WISHLIST:
      return {
        ...prevState,
        wishList: appendItem(prevState.wishList, action.payload, "wish")
      };
    case Actions.ADD_ITEM_TO_CART:
      return {
        ...prevState,
        cartList: appendItem(prevState.cartList, action.payload)
      };
    case Actions.UPDATE_QUANTITY:
      return {
        ...prevState,
        cartList: updateQuantity(
          prevState.cartList,
          action.payload.id,
          action.payload.incOrDec
        )
      };
    case Actions.REMOVE_FROM_CART:
      return {
        ...prevState,
        cartList: removeItem(prevState.cartList, action.payload.id)
      };
    case Actions.PRICE_HIGH_TO_LOW:
      return {
        ...prevState,
        sortBy: Actions.PRICE_HIGH_TO_LOW
      };
    case Actions.PRICE_LOW_TO_HIGH:
      return {
        ...prevState,
        sortBy: Actions.PRICE_LOW_TO_HIGH
      };
    case Actions.FILTER_OUT_OF_STOCK:
      return {
        ...prevState,
        showOutOfStock: !prevState.showOutOfStock
      };
    case Actions.FILTER_FAST_DELIVERY:
      return {
        ...prevState,
        showFastDeliveryOnly: !prevState.showFastDeliveryOnly
      };
    case Actions.CLEAR_ALL_FILTERS:
      return {
        ...prevState,
        sortBy: "",
        showOutOfStock: false,
        showFastDeliveryOnly: false
      };
    case Actions.UPDATE_SEARCH_TEXT:
      return {
        ...prevState,
        search: action.payload
      };
    case Actions.OPEN_OR_CLOSE_TOAST:
      return {
        ...prevState,
        showToast: action.payload.show,
        toastMessage: action.payload.text
      };
    default:
      return prevState;
  }
};

export default productReducer;
