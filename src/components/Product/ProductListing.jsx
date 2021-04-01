import "./ProductListing.css";
import { Actions } from "../../reducers";
import { useProduct } from "../../contexts";
import { checkItemExist } from "../../reducers";
import { Link } from "react-router-dom";
import { handleToast } from "../Toast/Toast";

const ProductListing = ({ productList }) => {
  const {
    state: { wishList, cartList },
    dispatch
  } = useProduct();

  const addItemToCart = (product) => {
    handleToast(dispatch, "Cart Updated");
    dispatch({
      type: Actions.ADD_ITEM_TO_CART,
      payload: product
    });
  };

  const addOrRemoveWishList = (product) => {
    handleToast(dispatch, "Wishlist Updated");
    dispatch({
      type: Actions.ADD_OR_REMOVE_ITEM_TO_WISHLIST,
      payload: product
    });
  };

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
                onClick={() => addOrRemoveWishList(product)}
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
                  onClick={() => addItemToCart(product)}
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
