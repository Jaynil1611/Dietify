import "./styles.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Cart, Product, Toast, WishList, Home } from "./components";
import { useAxios } from "./server";
import { useProduct } from "./contexts";
import { getFilteredList } from "./reducers";

export default function App() {
  const {
    state: { wishList, cartList },
    dispatch,
  } = useProduct();
  const { loadingStatus: productLoadingStatus } = useAxios(
    "products",
    "productList"
  );
  const { loadingStatus: wishLoadingStatus } = useAxios("wishes", "wishList");
  const { loadingStatus: cartLoadingStatus } = useAxios("carts", "cartList");

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
            <Route exact path="/products">
              <Product loading={productLoadingStatus} />
            </Route>
            <Route exact path="/wish" component={WishList} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
