import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
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
  ProductOutOfStock,
  getFilteredList,
} from "../index";

const getTotalPrice = (cartList) => {
  return cartList.reduce((totalPrice, { price, cartQuantity }) => {
    return totalPrice + price * cartQuantity;
  }, 0);
};

function Cart() {
  const {
    state: { cartList, wishList },
    dispatch,
  } = useProduct();

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
    handleToast(
      dispatch,
      `Your order of Rs. ${getTotalPrice(cartList)} has been placed!`
    );
  };

  return (
    <>
      <div className="h5 text--bold  spacing text--center"> Your Cart </div>
      {getFilteredList(cartList).length === 0 ? (
        <div className="text--center h6 text--gray">Your cart is empty</div>
      ) : (
        <>
          <div className="cart__checkout">
            <div className="text--center h6 text--bold">
              Total Checkout Price : {getTotalPrice(cartList)}
            </div>
            <button
              type="button"
              className="button button--primary button--sm subtitle--sm"
              onClick={showConfirmation}
            >
              <Link to="/" className="text--white">
                Place Order
              </Link>
            </button>
          </div>
          <div className="product-showcase">
            {getFilteredList(cartList).map((product) => {
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
                    <ProductOutOfStock inStock={inStock} />
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
