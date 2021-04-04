import "./styles.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Cart, Product, Toast, WishList, Home } from "./components";
import { useAxios } from "./server";
import { useEffect } from "react";
import { useProduct } from "./contexts";
import { actions } from "./reducers";
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
        type: actions.INITIALIZE_LIST,
        payload: { name: "productList", data: productList.products },
      });
      dispatch({
        type: actions.INITIALIZE_LIST,
        payload: { name: "wishList", data: wishItems.wishes },
      });
      dispatch({
        type: actions.INITIALIZE_LIST,
        payload: { name: "cartList", data: cartItems.carts },
      });
    }
  }, [cartItems]);

  return (
    <div className="body--spacing">
      <Router>
        <div className="heading">
          <h1>
            <Link to="/home">Dietify</Link>
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
            <Route exact path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
