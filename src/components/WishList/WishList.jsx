import React from "react";
import { useProduct } from "../../contexts";
import { Actions } from "../../reducers";
import { handleToast } from "../Toast/Toast";
import "./WishList.css";

function WishList() {
  const {
    state: { wishList },
    dispatch
  } = useProduct();

  const addItemToCart = (product) => {
    handleToast(dispatch, "Wishlist & Cart Updated");
    removeFromWishList(product);
    dispatch({
      type: Actions.ADD_ITEM_TO_CART,
      payload: product
    });
  };

  const removeFromWishList = (product) => {
    handleToast(dispatch, "Removed from Wishlist");
    dispatch({
      type: Actions.ADD_OR_REMOVE_ITEM_TO_WISHLIST,
      payload: product
    });
  };

  return (
    <>
      <div className="h5 text--bold spacing text--center"> Your Wishlist </div>
      {wishList.length === 0 ? (
        <div className="text--center h6 text--gray">Your wishlist is empty</div>
      ) : (
        <div className="product-showcase">
          {wishList.map((product) => {
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
                    onClick={() => addItemToCart(product)}
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
