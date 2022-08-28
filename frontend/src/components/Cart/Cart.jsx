import React, { useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts";
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
import { useDocumentTitle } from "../../utils";
import Checkout from "./Checkout";

function Cart({ loading }) {
  const {
    state: { cartList, wishList },
    dispatch,
  } = useProduct();
  useDocumentTitle("Cart");
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

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

  const filteredCartList = getFilteredList(cartList);
  const Loader = <span className="loading spacing"></span>;

  return (
    <>
      <div className="h5 text--bold spacing text--center">My Cart</div>
      {showLoader && Loader}
      {loading ? (
        Loader
      ) : (
        <>
          <div className="container">
            {filteredCartList.length > 0 && (
              <Checkout setShowLoader={setShowLoader} />
            )}
            {filteredCartList.length === 0 && (
              <div className="text--center h6 text--gray">Cart is empty</div>
            )}
            <div>
              <div className="product-showcase payment__details">
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
                        <ProductContent
                          price={price}
                          brand={brand}
                          offer={offer}
                        />
                        <div className="spacing--sm">
                          <PrimaryButton
                            onClick={() =>
                              decrementQuantity(product, cartQuantity)
                            }
                          >
                            {cartQuantity === 1 ? (
                              <i className="fas fa-trash-alt fa-lg"></i>
                            ) : (
                              "-"
                            )}
                          </PrimaryButton>
                          <span className="spacing--horiz">{cartQuantity}</span>
                          <PrimaryButton
                            onClick={() => incrementQuantity(product)}
                          >
                            +
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
