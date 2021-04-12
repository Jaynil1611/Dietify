import React from "react";
import "./WishList.css";
import { useProduct } from "../../contexts";
import { addItemToCart, addOrRemoveFromWish } from "../../server";
import {
  ProductImage,
  ProductName,
  PrimaryButton,
  ProductContent,
  ProductOutOfStock,
  getFilteredList,
} from "../index";

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
            const {
              id,
              name,
              image,
              price,
              brand,
              offer,
              inStock,
              ratings,
            } = product;
            return (
              <div key={id} className="card card--product">
                <div className={`card__badge badge--position`}>
                  <i
                    className={`fas fa-heart fa-lg `}
                    onClick={() => removeFromWishList(product)}
                  ></i>
                </div>
                <ProductImage image={image} inStock={inStock} />
                <ProductName name={name} ratings={ratings} />
                <div className="card__content card__content--align">
                  <ProductContent price={price} brand={brand} offer={offer} />
                  <ProductOutOfStock inStock={inStock} />
                  <PrimaryButton onClick={() => addItemToCartList(product)}>
                    Move to Cart
                  </PrimaryButton>
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
