import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { handleToast } from "../components";
import { actions, productReducer } from "../reducers";
import { callMockServer, constructURL } from "../server";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServerCalls,
} from "../utils";
import { initialState } from "./initialState";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("isUserLoggedIn"))
  );

  useEffect(() => {
    setupAuthExceptionHandler(dispatch);
  }, []);

  const loginUser = async (email, password) => {
    const { response, error } = await callMockServer({
      type: "post",
      url: `${constructURL()}/login`,
      data: { email, password },
    });
    if (!error) {
      const { firstname, lastname, token: responseToken } = response?.data;
      setToken(responseToken);
      setupAuthHeaderForServerCalls(responseToken);
      localStorage.setItem("isUserLoggedIn", JSON.stringify(responseToken));

      dispatch({
        type: actions.UPDATE_USER_DETAILS,
        payload: { firstname, lastname },
      });
      handleToast(dispatch, "Login successful");
      return true;
    }
    handleToast(dispatch, "Email or password is incorrect");
    return false;
  };

  const logoutUser = () => {
    setToken(null);
    setupAuthHeaderForServerCalls(null);
    dispatch({ type: actions.RESET_STATE });
    localStorage.removeItem("isUserLoggedIn");
    handleToast(dispatch, "Logout successful");
    navigate("/");
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, token, loginUser, logoutUser }}
    >
      {children}
    </ProductContext.Provider>
  );
};
