import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../contexts";
import { Actions } from "../../reducers";
import { handleToast } from "../Toast/Toast";
import "./Cart.css";

const getTotalPrice = (cartList) => {
  return cartList.reduce((totalPrice, { price, cartQuantity }) => {
    return totalPrice + price * cartQuantity;
  }, 0);
};

function Cart() {
  const {
    state: { cartList },
    dispatch
  } = useProduct();

  const incrementQuantity = (id) => {
    dispatch({
      type: Actions.UPDATE_QUANTITY,
      payload: { id, incOrDec: true }
    });
  };

  const decrementQuantity = (id, quantity) => {
    quantity === 1
      ? removeFromCart(id)
      : dispatch({
          type: Actions.UPDATE_QUANTITY,
          payload: { id, incOrDec: false }
        });
  };

  const removeFromCart = (id) => {
    handleToast(dispatch, "Removed from Cart");
    dispatch({
      type: Actions.REMOVE_FROM_CART,
      payload: { id }
    });
  };

  const removeFromCartAddToWishList = (product) => {
    handleToast(dispatch, "Removed from Cart");
    dispatch({
      type: Actions.REMOVE_FROM_CART,
      payload: { id: product.id }
    });
    dispatch({
      type: Actions.ADD_OR_REMOVE_ITEM_TO_WISHLIST,
      payload: product
    });
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
      {cartList.length === 0 ? (
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
            {cartList.map((product) => {
              const {
                id,
                name,
                image,
                price,
                brand,
                offer,
                cartQuantity
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
                        onClick={() => decrementQuantity(id, cartQuantity)}
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
