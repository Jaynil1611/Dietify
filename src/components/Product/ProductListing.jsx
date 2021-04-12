import { useProduct } from "../../contexts";
import { checkItemExist } from "../../reducers";
import { Link } from "react-router-dom";
import { addOrRemoveFromWish, addItemToCart } from "../../server";
import "./ProductListing.css";

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
            <ProductImage image={image} inStock={inStock} />
            <ProductName name={name} ratings={ratings} />
            <div className="card__content card__content--align">
              <ProductContent price={price} brand={brand} offer={offer} />
              <ProductOutOfStock inStock={inStock} />
              {checkItemExist(cartList, id) ? (
                <PrimaryButton>
                  <Link className="text--white" to="/cart">
                    Go to Cart
                  </Link>
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  inStock={inStock}
                  onClick={() => addItemToCart(dispatch, product)}
                >
                  Add to Cart
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
  <div className="card__heading name--align subtitle--md text--bold">
    <span>{name}</span>
    <div className="rating--align text--white body--md">
      {ratings}
      <i className="fas fa-star fa-xs rating__icon"></i>
    </div>
  </div>
);

export const ProductImage = ({ image, inStock }) => (
  <img
    className={`img--responsive ${inStock ? "" : "img--gray"}`}
    src={image}
    alt=""
  />
);

export const ProductContent = ({ brand, offer, price }) => (
  <>
    <p className="subtitle--sm spacing--horiz spacing--p">{brand}</p>
    <p className="spacing--horiz spacing--p">
      <span className="subtitle--md text--bold ">Rs.{price}</span>
      <span className="text--primary body--md"> {offer} </span>
    </p>
  </>
);

export const ProductOutOfStock = ({ inStock }) => {
  return !inStock ? (
    <div className="out-of-stock">
      <p> OUT OF STOCK</p>
    </div>
  ) : (
    <></>
  );
};

export const PrimaryButton = ({ children, onClick, inStock }) => (
  <button
    onClick={onClick}
    disabled={!inStock}
    className="button button--primary button--sm subtitle--sm text--white"
  >
    {children}
  </button>
);

export default ProductListing;
