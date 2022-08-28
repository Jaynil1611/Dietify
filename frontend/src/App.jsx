import { Route, Routes } from "react-router-dom";
import {
  Cart,
  Product,
  Toast,
  WishList,
  Home,
  NotFound,
  PrivateRoute,
  Login,
  SignUp,
  Logout,
  MobileMenu,
  Header,
} from "./components";
import { useAxios } from "./server";
import {
  setupAuthHeaderForServerCalls,
  useCleaner,
  useDocumentTitle,
} from "./utils";
import { useEffect, useState } from "react";
import { actions } from "./reducers";
import { useProduct } from "./contexts";
import "./styles.css";

export default function App() {
  const token = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  setupAuthHeaderForServerCalls(token);
  const productResponse = useAxios("products", "productList", false);
  const wishlistResponse = useAxios("wishes", "wishList");
  const cartResponse = useAxios("cart", "cartList");
  const {
    state: { productList },
    dispatch,
  } = useProduct();
  const [showMenu, setShowMenu] = useState(false);
  useDocumentTitle("Home");
  useCleaner();

  useEffect(() => {
    if (productList.length) dispatch({ type: actions.INITIALIZE_BRANDS });
  }, [productList.length]);

  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <Header
        token={token}
        showMenu={showMenu}
        handleSideMenuClick={handleSideMenuClick}
      />
      <div className="main-content">
        <MobileMenu
          token={token}
          showMenu={showMenu}
          handleSideMenuClick={handleSideMenuClick}
        />
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Product loading={productResponse.loadingStatus} />}
          />
          <Route
            path="/wish"
            element={
              <PrivateRoute>
                <WishList loading={wishlistResponse.loadingStatus} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart loading={cartResponse.loadingStatus} />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
