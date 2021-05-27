import "./styles.css";
import { Link, Route, Routes } from "react-router-dom";
import { Cart, Product, Toast, WishList, Home, NotFound } from "./components";
import { useAxios } from "./server";
import { useProduct } from "./contexts";
import { useDocumentTitle } from "./utils";

export default function App() {
  const {
    state: { wishList, cartList },
    dispatch,
  } = useProduct();
  const productResponse = useAxios("products", "productList");
  const wishlistResponse = useAxios("wishes", "wishList");
  const cartResponse = useAxios("cart", "cartList");
  useDocumentTitle("Home");

  return (
    <div>
      <div className="heading">
        <h1 className="heading__name">
          <Link to="/">Dietify</Link>
        </h1>
        <nav>
          <ul className="nav nav--right">
            <li></li>
            <li>
              <Link
                className="nav--link text--gray badge__container"
                to="/wish"
              >
                <i className="fas fa-heart fa-lg">
                  <span className="badge__icon text--white badge__icon badge--overlay">
                    {wishList.length}
                  </span>
                </i>
              </Link>
            </li>
            <li>
              <Link
                className="nav--link text--gray badge__container"
                to="/cart"
              >
                <i className="fas fa-shopping-cart fa-lg">
                  <span className="badge__icon text--white badge__icon badge--overlay">
                    {cartList.length}
                  </span>
                </i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Product loading={productResponse.loadingStatus} />}
          />
          <Route
            path="/wish"
            element={<WishList loading={wishlistResponse.loadingStatus} />}
          />
          <Route
            path="/cart"
            element={<Cart loading={cartResponse.loadingStatus} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
