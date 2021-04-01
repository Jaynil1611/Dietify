import "./ProductListing.css";
import { useProduct } from "../../contexts";
import { checkItemExist } from "../../reducers";
import { Link } from "react-router-dom";
import { addOrRemoveFromWish, addItemToCart } from "./ServerUpdate";

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
            <img className="img--responsive" src={image} alt="" />
            <h3 className="card__heading spacing--horiz name--align">{name}</h3>
            <div className="card__content card__content--align spacing--hz">
              <p className="subtitle--sm">{brand}</p>
              <p className="spacing--vh">
                <span className="subtitle--md text--bold ">Rs.{price}</span>
                <span className="text--primary body--md"> {offer} </span>
              </p>
              {checkItemExist(cartList, id) ? (
                <button className="button button--primary button--sm subtitle--sm">
                  <Link className="text-white" to="/cart">
                    Go to Cart
                  </Link>
                </button>
              ) : (
                <button
                  onClick={() => addItemToCart(dispatch, product)}
                  className="button button--primary button--sm text-white subtitle--sm"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductListing;
