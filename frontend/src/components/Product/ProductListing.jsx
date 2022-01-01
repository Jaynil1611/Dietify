import { useProduct } from "../../contexts";
import { checkItemExist } from "../../reducers";
import { Link } from "react-router-dom";
import { addOrRemoveFromWish, addItemToCart } from "../../server";
import "./ProductListing.css";
import { convertToRupee } from "../../utils";

const ProductListing = ({ productList }) => {
  const {
    state: { wishList, cartList },
    dispatch,
  } = useProduct();

  return (
    <div className="product-showcase">
      {productList.map((product) => {
        const {
          id,
          name,
          image,
          fastDelivery,
          price,
          brand,
          offer,
          inStock,
          ratings,
        } = product;
        return (
          <div key={id} className="card card--product">
            <div className="card__badge badge--position">
              <i
                className={`${
                  checkItemExist(wishList, id) ? "fas" : "far"
                } fa-heart fa-lg `}
                onClick={() => addOrRemoveFromWish(dispatch, product, wishList)}
              ></i>
            </div>
            <div>
              {fastDelivery && (
                <span className="card__badge badge--fastdel body--sm">
                  fast delivery
                </span>
              )}
            </div>
            <ProductImage image={image} inStock={inStock} />
            <ProductName name={name} ratings={ratings} />
            <div className="card__content card__content--align">
              <ProductContent price={price} brand={brand} offer={offer} />
              {checkItemExist(cartList, id) ? (
                <Link to="/cart">
                  <PrimaryButton className="width--100">
                    Go to Cart
                  </PrimaryButton>
                </Link>
              ) : (
                <PrimaryButton
                  inStock={inStock}
                  className={inStock ? "" : "out-of-stock"}
                  onClick={() => addItemToCart(dispatch, product, cartList)}
                >
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </PrimaryButton>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ProductName = ({ name, ratings }) => (
  <div className="card__heading name--align text--bold">
    <span className="name--wrap">{name}</span>
    <div className="rating--align text--white body--md">
      {ratings}
      <i className="fas fa-star fa-xs rating__icon"></i>
    </div>
  </div>
);

export const ProductImage = ({ image, inStock }) => (
  <img
    loading="lazy"
    className={`img--height ${inStock ? "" : "img--gray"}`}
    src={image}
    alt=""
  />
);

export const ProductContent = ({ brand, offer, price }) => (
  <>
    <p className="subtitle--sm spacing--horiz spacing--p">{brand}</p>
    <p className="spacing--horiz spacing--p">
      <span className="subtitle--md text--bold">₹{convertToRupee(price)}</span>
      <span className="text--primary body--md"> {offer} </span>
    </p>
  </>
);

export const PrimaryButton = ({ children, onClick, inStock, className }) => (
  <button
    onClick={onClick}
    disabled={inStock ? !inStock : false}
    className={`button button--primary button--sm subtitle--sm text--white ${className}`}
  >
    {children}
  </button>
);

export default ProductListing;
