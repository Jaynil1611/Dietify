import React, { useState } from "react";
import "./Product.css";
import { useProduct } from "../../contexts";
import { Actions } from "../../reducers";
import ProductListing from "./ProductListing";
import { getFilteredData, getSearchedData, getSortedData } from "./Filter";

function Product({ loading }) {
  const {
    state: {
      sortBy,
      showOutOfStock,
      showFastDeliveryOnly,
      productList,
      search,
    },
    dispatch,
  } = useProduct();
  const [showFilter, setShowFilter] = useState(false);

  const sortPriceLowToHigh = () => {
    dispatch({ type: Actions.PRICE_LOW_TO_HIGH });
  };

  const sortPriceHighToLow = () => {
    dispatch({ type: Actions.PRICE_HIGH_TO_LOW });
  };

  const filterOutOfStock = () => {
    dispatch({ type: Actions.FILTER_OUT_OF_STOCK });
  };

  const filterFastDelivery = () => {
    dispatch({ type: Actions.FILTER_FAST_DELIVERY });
  };

  const clearAllFilters = () => {
    dispatch({ type: Actions.CLEAR_ALL_FILTERS });
  };

  const searchProduct = (search) => {
    dispatch({ type: Actions.UPDATE_SEARCH_TEXT, payload: search });
  };

  const sortedData = getSortedData(sortBy, productList);
  const filteredData = getFilteredData(
    showOutOfStock,
    showFastDeliveryOnly,
    sortedData
  );

  const searchedData = getSearchedData(filteredData, search);

  return (
    <div className="product-container">
      <div className="h6 text--bold text--center">
        Products:
        {loading ? (
          <span> Loading Items... </span>
        ) : (
          <span> {searchedData.length} </span>
        )}
      </div>
      <div className="filter-options">
        <div className="input__search">
          <i className="fas fa-search fa-lg search__icon"></i>
          <input
            type="text"
            className="input search-bar"
            onChange={(e) => searchProduct(e.target.value)}
            placeholder="Search products"
          />
        </div>
      </div>
      <div className="product__filter--wrapper">
        <div
          className={`${
            showFilter ? "product__filter--mobile" : "product__filter"
          } `}
        >
          <div className="filter__heading">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="button button--outline button--sm subtitle--sm"
            >
              {showFilter ? "Apply" : "Filters"}
            </button>
            <button
              className="button button--primary text--white button--sm subtitle--sm"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>
          <div className="filter__section">
            <fieldset className="fieldset--style spacing--vh">
              <legend> Price Sort by </legend>
              <div>
                <input
                  onChange={sortPriceLowToHigh}
                  checked={sortBy && sortBy === Actions.PRICE_LOW_TO_HIGH}
                  type="radio"
                  name="sort"
                />
                <label> Low to High </label>
              </div>
              <div>
                <input
                  onChange={sortPriceHighToLow}
                  type="radio"
                  name="sort"
                  checked={sortBy && sortBy === Actions.PRICE_HIGH_TO_LOW}
                />
                <label> High to Low </label>
              </div>
            </fieldset>
            <fieldset className="fieldset--style spacing--vh">
              <legend> Availability </legend>
              <div>
                <input onChange={filterOutOfStock} type="checkbox" />
                <label> Include Out of Stock </label>
              </div>
              <div>
                <input onChange={filterFastDelivery} type="checkbox" />
                <label> Fast Delivery </label>
              </div>
            </fieldset>
          </div>
        </div>
        <div className={`${showFilter ? "hide" : "filter__panel--heading"}`}>
          <button
            className="button button--outline button--sm subtitle--sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters
          </button>
          <button
            className="button button--primary text--white button--sm subtitle--sm"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
        {searchedData.length > 0 ? (
          <ProductListing productList={searchedData} />
        ) : (
          search && (
            <div className="h6 text--center"> No items found with {search}</div>
          )
        )}
      </div>
    </div>
  );
}

export default Product;
