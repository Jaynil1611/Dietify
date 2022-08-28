import React from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../../contexts";
import { convertToRupee, getTotalPrice } from "../../utils";
import { handleToast } from "../Toast/Toast";
import { displayRazorpay } from "./Payment";

function Checkout({ setShowLoader }) {
  const {
    state: { cartList },
    dispatch,
  } = useProduct();
  const navigate = useNavigate();

  const totalPrice = getTotalPrice(cartList);
  const discount = Math.floor((totalPrice * 5) / 100);

  const showConfirmation = () => {
    if (totalPrice <= 0) return handleToast(dispatch, "Your cart is empty!");
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      displayRazorpay(totalPrice - discount, dispatch, navigate);
    }, 1000);
  };

  return (
    <>
      <div className="cart__overview">
        <div className="h6 text--center text--bold margin--bottom">
          Price Details
        </div>
        <div className="cart__item">
          <div className="cart__item-name">
            <div>Price ({cartList.length} item)</div>
          </div>
          <div>₹{convertToRupee(totalPrice)}</div>
        </div>
        <div className="cart__item">
          <div className="cart__item-name">
            <div>Discount</div>
          </div>
          <div className="text--gray text--semibold">
            - ₹{convertToRupee(discount)}
          </div>
        </div>
        <div className="cart__item">
          <div className="cart__item-name">
            <div>Delivery Charges</div>
          </div>
          <div className="text--gray text--semibold">FREE</div>
        </div>
        <div className="cart__item">
          <div className="cart__item-name">
            <div className="text--bold">Total Amount</div>
          </div>
          <div className="text--semibold">
            ₹ {convertToRupee(totalPrice - discount)}
          </div>
        </div>
        <button
          type="button"
          className="button button--primary button--sm subtitle--sm margin--md text--white"
          onClick={showConfirmation}
        >
          Place Order
        </button>
      </div>
    </>
  );
}

export default Checkout;
