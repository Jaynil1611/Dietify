import React, { useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts";
import { handleToast } from "../Toast/Toast";
import {
  removeFromCart,
  addOrRemoveFromWish,
  updateCartItem,
} from "../../server";
import {
  ProductImage,
  ProductName,
  PrimaryButton,
  ProductContent,
  getFilteredList,
} from "../index";
import useToastCleaner from "../../utils/useToastCleaner";
import { useDocumentTitle } from "../../utils";

const constructCartURL = (cartList) => {
  let urlParams = "";
  cartList.forEach(({ asinId, cartQuantity }, index) => {
    urlParams = urlParams.concat(
      `ASIN.${index}=${asinId}&Quantity.${index}=${cartQuantity}&`
    );
  });
  return `https://www.amazon.in/gp/aws/cart/add.html?${urlParams}`;
};

const getTotalPrice = (cartList) => {
  return cartList.reduce((totalPrice, { price, cartQuantity }) => {
    return totalPrice + price * cartQuantity;
  }, 0);
};

function Cart({ loading }) {
  const {
    state: { cartList, wishList },
    dispatch,
  } = useProduct();
  useToastCleaner();
  useDocumentTitle("Cart");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const incrementQuantity = (product) => {
    updateCartItem(dispatch, {
      ...product,
      cartQuantity: product.cartQuantity + 1,
    });
  };

  const decrementQuantity = (product, quantity) => {
    quantity === 1
      ? removeFromCart(dispatch, product)
      : updateCartItem(dispatch, {
          ...product,
          cartQuantity: product.cartQuantity - 1,
        });
  };

  const removeFromCartAddToWishList = (product) => {
    removeFromCart(dispatch, product);
    addOrRemoveFromWish(dispatch, product, wishList);
  };

  const showConfirmation = () => {
    if (totalPrice <= 0) return handleToast(dispatch, "Your cart is empty!");
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      window.open(constructCartURL(cartList), "_blank");
    }, 2000);
    handleToast(
      dispatch,
      `You are being redirected to Amazon's Cart to complete your order!`
    );
  };

  const filteredCartList = getFilteredList(cartList);
  const totalPrice = getTotalPrice(filteredCartList);
  const Loader = <span className="loading"></span>;

  return (
    <>
      <div className="h5 text--bold  spacing text--center"> Your Cart </div>
      {filteredCartList.length === 0 && (
        <div className="text--center h6 text--gray">Your cart is empty</div>
      )}
      {showLoader && Loader}
      {loading ? (
        Loader
      ) : (
        <>
          <div className="cart__checkout">
            <div className="text--center h6 text--bold">
              Total Checkout Price : {totalPrice}
            </div>
            <button
              type="button"
              className="button button--primary button--sm subtitle--sm margin--md text--white"
              onClick={showConfirmation}
            >
              Place Order
            </button>
          </div>
          <div className="product-showcase cart--margin">
            {filteredCartList.map((product) => {
              const {
                id,
                name,
                image,
                price,
                brand,
                offer,
                cartQuantity,
                inStock,
                ratings,
              } = product;
              return (
                <div key={id} className="card card--product">
                  <ProductImage image={image} inStock={inStock} />
                  <ProductName name={name} ratings={ratings} />
                  <div className="card__content card__content--align">
                    <ProductContent price={price} brand={brand} offer={offer} />
                    <div className="spacing--sm">
                      <PrimaryButton onClick={() => incrementQuantity(product)}>
                        +
                      </PrimaryButton>
                      <span className="spacing--horiz">{cartQuantity}</span>
                      <PrimaryButton
                        onClick={() => decrementQuantity(product, cartQuantity)}
                      >
                        {cartQuantity === 1 ? (
                          <i className="fas fa-trash-alt fa-lg"></i>
                        ) : (
                          "-"
                        )}
                      </PrimaryButton>
                    </div>
                    <PrimaryButton
                      onClick={() => removeFromCartAddToWishList(product)}
                    >
                      Move to Wishlist
                    </PrimaryButton>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
