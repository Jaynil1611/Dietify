import { createContext, useContext, useReducer } from "react";
import { productReducer } from "../reducers";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    productList: [],
    cartList: [],
    wishList: [],
    sortBy: "",
    showOutOfStock: false,
    showFastDeliveryOnly: false,
    search: "",
    showToast: false,
    toastMessage: ""
  });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
