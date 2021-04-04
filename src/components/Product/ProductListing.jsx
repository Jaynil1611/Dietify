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
        const { id, name, image, price, brand, offer } = product;
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
            <ProductImage image={image} />
            <ProductName name={name} />
            <div className="card__content card__content--align">
              <ProductContent price={price} brand={brand} offer={offer} />
              {checkItemExist(cartList, id) ? (
                <PrimaryButton>
                  <Link className="text--white" to="/cart">
                    Go to Cart
                  </Link>
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={() => addItemToCart(dispatch, product)}>
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

export const ProductName = ({ name }) => (
  <div className="card__heading name--align subtitle--md text--bold">
    {name}
  </div>
);

export const ProductImage = ({ image }) => (
  <img className="img--responsive" src={image} alt="" />
);

export const ProductContent = ({ brand, offer, price }) => (
  <>
    <p className="subtitle--sm spacing--horiz">{brand}</p>
    <p className="spacing--horiz spacing--p">
      <span className="subtitle--md text--bold ">Rs.{price}</span>
      <span className="text--primary body--md"> {offer} </span>
    </p>
  </>
);

export const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="button button--primary button--sm subtitle--sm text--white"
  >
    {children}
  </button>
);

export default ProductListing;
