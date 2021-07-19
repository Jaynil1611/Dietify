import React from "react";
import "./WishList.css";
import { useProduct } from "../../contexts";
import { addItemToCart, removeFromWish } from "../../server";
import {
  ProductImage,
  ProductName,
  PrimaryButton,
  ProductContent,
} from "../index";
import { useDocumentTitle } from "../../utils";

function WishList({ loading }) {
  const {
    state: { wishList, cartList },
    dispatch,
  } = useProduct();

  useDocumentTitle("Wishlist");

  const addItemToCartList = (product) => {
    removeFromWish(dispatch, product);
    addItemToCart(dispatch, product, cartList);
  };

  const removeFromWishList = (product) => {
    removeFromWish(dispatch, product);
  };

  return (
    <>
      <div className="h5 text--bold spacing text--center"> My Wishlist </div>

      {loading ? (
        <span className="loading"></span>
      ) : (
        <>
          {wishList.length === 0 && (
            <div className="text--center h6 text--gray">Wishlist is empty</div>
          )}
          <div className="product-showcase wishlist--margin">
            {wishList.map((product) => {
              const { id, name, image, price, brand, offer, inStock, ratings } =
                product;
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
                    <PrimaryButton
                      inStock={inStock}
                      className={inStock ? "" : "out-of-stock"}
                      onClick={() => addItemToCartList(product)}
                    >
                      {inStock ? "Move to Cart" : "Out of Stock"}
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

export default WishList;
