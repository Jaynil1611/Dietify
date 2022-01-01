import { callMockServer, constructURL } from "../../server";
import { clearCart } from "../../server/ServerUpdate";
import { handleToast } from "../Toast/Toast";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(totalPrice, dispatch, navigate) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay Payment Gateway failed to load. Are you online?");
    return;
  }

  const { response } = await callMockServer({
    type: "post",
    url: `${constructURL()}/payment/orders`,
    data: { amount: totalPrice },
  });

  if (!response) {
    alert("Server error. Are you online?");
    return;
  }

  const { amount, id: order_id, currency } = response.data.order;

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: amount.toString(),
    currency: currency,
    name: "Dietify",
    description: "Dietify Checkout",
    image: "https://dietify.vercel.app/favicon.ico",
    order_id: order_id,
    handler: function () {
      handleToast(
        dispatch,
        "Payment Successful! Your order will be dispatched soon!"
      );
      setTimeout(() => navigate("/products"), 3000);
      clearCart(dispatch);
    },
    notes: {
      address: "Dietify Limited",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
