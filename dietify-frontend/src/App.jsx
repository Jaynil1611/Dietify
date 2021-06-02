import React from "react";
import "./styles.css";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import {
  Cart,
  Product,
  Toast,
  WishList,
  Home,
  NotFound,
  Avatar,
  PrivateRoute,
  Login,
  SignUp,
  Logout,
} from "./components";
import { useAxios } from "./server";
import { useProduct } from "./contexts";
import {
  getFilteredMenuList,
  setupAuthHeaderForServerCalls,
  useDocumentTitle,
} from "./utils";
import { useState } from "react";

export default function App() {
  const token = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  setupAuthHeaderForServerCalls(token);
  const {
    state: { wishList, cartList },
  } = useProduct();
  const productResponse = useAxios("products", "productList", false);
  const wishlistResponse = useAxios("wishes", "wishList");
  const cartResponse = useAxios("cart", "cartList");
  useDocumentTitle("Home");
  const [showMenu, setShowMenu] = useState(false);

  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className="heading">
        <div className="mobile-menu" onClick={handleSideMenuClick}>
          {showMenu ? (
            <i className="fas fa-times fa-lg spacing--horiz"></i>
          ) : (
            <i className="fas fa-bars fa-lg spacing--horiz"></i>
          )}
        </div>
        <h1 className="heading__name">
          <Link to="/">Dietify</Link>
        </h1>
        <div className="showNav">
          <ul className="list--inline li--border flex--row">
            {getFilteredMenuList(menuList, token).map(({ name, path }) => (
              <li key={name} className="list__item  li--border spacing--sm">
                <NavLink
                  end
                  onClick={handleSideMenuClick}
                  to={`${path}`}
                  className="active"
                  activeClassName="active"
                >
                  <span className="subtitle--sm">{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {token && (
          <nav className="nav--right">
            <ul className="nav">
              <li className="width--4">
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
              <li className="width--4">
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
              <li className="width--4">
                <Avatar />
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="main-content">
        <div className={`side-bar ${showMenu ? "show" : ""}`}>
          <div className={`side-menu ${showMenu ? "view" : ""}`}>
            <ul className="list__group li--border sidebar--scroll">
              {getFilteredMenuList(menuList, token).map(
                ({ name, icon, path }) => (
                  <li key={name} className="list__item li--border spacing--sm">
                    <NavLink
                      end
                      onClick={handleSideMenuClick}
                      to={`${path}`}
                      className="active"
                      activeClassName="active"
                    >
                      <span className="padding--right-md">
                        <i className={`fas ${icon} icon--md`}></i>
                      </span>
                      <span className="subtitle--sm">{name}</span>
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Product loading={productResponse.loadingStatus} />}
          />
          <PrivateRoute
            path="/wish"
            element={<WishList loading={wishlistResponse.loadingStatus} />}
          />
          <PrivateRoute
            path="/cart"
            element={<Cart loading={cartResponse.loadingStatus} />}
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

const menuList = [
  { name: "Home", icon: "fa-home-alt", path: "/" },
  { name: "Products", icon: "fa-list-ul", path: "/products" },
  { name: "Wishlist", icon: "fa-heart", path: "/wish" },
  { name: "Cart", icon: "fa-shopping-cart", path: "/cart" },
  { name: "Login", icon: "fa-sign-in-alt", path: "/login" },
];
