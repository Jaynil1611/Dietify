import axios from "axios";
import { handleToast } from "../components";

export const setupAuthHeaderForServerCalls = (AUTH_TOKEN) => {
  return AUTH_TOKEN
    ? (axios.defaults.headers.common["Authorization"] = AUTH_TOKEN)
    : delete axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (dispatch) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        handleToast(dispatch, "You need to login to perform the action!");
      }
      return Promise.reject(error);
    }
  );
};

export const getTotalPrice = (cartList) => {
  return cartList.reduce((totalPrice, { price, cartQuantity }) => {
    return totalPrice + price * cartQuantity;
  }, 0);
};

export const convertToRupee = (number) => number.toLocaleString("en-IN");
