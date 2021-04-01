import "./styles.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Cart, Product, Toast, WishList } from "./components";
import { useAxios } from "./api";
import { useEffect } from "react";
import { useProduct } from "./contexts";
import { Actions } from "./reducers";
import { getFilteredList } from "./reducers";

export default function App() {
  const {
    state: { wishList, cartList },
    dispatch,
  } = useProduct();
  const [productList, loadingStatus] = useAxios("/api/products");
  const [wishItems] = useAxios("api/wishes");
  const [cartItems] = useAxios("api/carts");

  useEffect(() => {
    if (cartItems.carts) {
      dispatch({
        type: Actions.INITIALIZE_CART,
        payload: cartItems.carts,
      });
      dispatch({
        type: Actions.INITIALIZE_WISH,
        payload: wishItems.wishes,
      });
      dispatch({
        type: Actions.INITIALIZE_PRODUCTS,
        payload: productList.products,
      });
    }
  }, [cartItems]);

  return (
    <div className="body--spacing">
      <Router>
        <div className="heading">
          <h1>
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
                      {getFilteredList(wishList).length}
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
                      {getFilteredList(cartList).length}
                    </span>
                  </i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <Toast />
          <Switch>
            <Route exact path="/">
              <Product loading={loadingStatus} />
            </Route>
            <Route exact path="/wish" component={WishList} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
