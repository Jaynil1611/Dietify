import React from "react";
import "./WishList.css";
import { useProduct } from "../../contexts";
import { addItemToCart, addOrRemoveFromWish } from "../index";
import { getFilteredList } from "../../reducers";

function WishList() {
  const {
    state: { wishList },
    dispatch,
  } = useProduct();

  const addItemToCartList = (product) => {
    removeFromWishList(product);
    addItemToCart(dispatch, product);
  };

  const removeFromWishList = (product) => {
    addOrRemoveFromWish(dispatch, product, wishList);
  };

  return (
    <>
      <div className="h5 text--bold spacing text--center"> Your Wishlist </div>
      {getFilteredList(wishList).length === 0 ? (
        <div className="text--center h6 text--gray">Your wishlist is empty</div>
      ) : (
        <div className="product-showcase">
          {getFilteredList(wishList).map((product) => {
            const { id, name, image, price, brand, offer } = product;
            return (
              <div key={id} className="card card--product">
                <div className={`card__badge badge--position`}>
                  <i
                    className={`fas fa-heart fa-lg `}
                    onClick={() => removeFromWishList(product)}
                  ></i>
                </div>
                <img className="img--responsive" src={image} alt="" />
                <h3 className="card__heading spacing--horiz name--align">
                  {name}
                </h3>
                <div className="card__content card__content--align spacing--hz">
                  <p className="subtitle--sm">{brand}</p>
                  <p className="spacing--vh">
                    <span className="subtitle--md text--bold ">Rs.{price}</span>
                    <span className="text--primary body--md"> {offer} </span>
                  </p>
                  <button
                    onClick={() => addItemToCartList(product)}
                    className="button button--primary button--sm text-white subtitle--sm"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default WishList;
