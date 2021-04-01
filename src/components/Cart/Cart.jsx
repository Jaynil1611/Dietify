import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useProduct } from "../../contexts";
import { Actions, getFilteredList } from "../../reducers";
import { handleToast } from "../Toast/Toast";
import { removeFromCart, addOrRemoveFromWish } from "../index";

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

  const incrementQuantity = (id) => {
    dispatch({
      type: Actions.UPDATE_QUANTITY,
      payload: { id, incOrDec: true },
    });
  };

  const decrementQuantity = (product, quantity) => {
    quantity === 1
      ? removeFromCart(dispatch, product)
      : dispatch({
          type: Actions.UPDATE_QUANTITY,
          payload: { id: product.id, incOrDec: false },
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
              <Link to="/" className="text-white">
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
              } = product;
              return (
                <div key={id} className="card card--product">
                  <img className="img--responsive" src={image} alt="" />
                  <h3 className="card__heading spacing--horiz name--align">
                    {name}
                  </h3>
                  <div className="card__content card__content--align spacing--hz">
                    <p className="subtitle--sm">{brand}</p>
                    <p className="spacing--vh">
                      <span className="subtitle--md text--bold ">
                        Rs.{price}
                      </span>
                      <span className="text--primary body--md"> {offer} </span>
                    </p>
                    <div className="spacing--vh">
                      <button
                        onClick={() => incrementQuantity(id)}
                        className="button button--primary button--sm text-white subtitle--sm"
                      >
                        +
                      </button>
                      <span className="spacing--hz">{cartQuantity}</span>
                      <button
                        onClick={() => decrementQuantity(product, cartQuantity)}
                        className="button button--primary button--sm text-white subtitle--sm"
                      >
                        {cartQuantity === 1 ? (
                          <i className="fas fa-trash-alt fa-lg"></i>
                        ) : (
                          "-"
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCartAddToWishList(product)}
                      className="button button--primary button--sm text-white subtitle--sm"
                    >
                      Move to Wishlist
                    </button>
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
