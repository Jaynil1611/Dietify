import React, { useState } from "react";
import { useProduct } from "../../contexts";
import { actions } from "../../reducers";
import ProductListing from "./ProductListing";
import {
  getFilteredData,
  getSearchedData,
  getSortedData,
  getPriceRangeData,
} from "./Filter";
import { PrimaryButton } from "./ProductListing";
import "./Product.css";
import useToastCleaner from "../../utils/useToastCleaner";
import { useDocumentTitle } from "../../utils";

function Product({ loading }) {
  const {
    state: {
      sortBy,
      showOutOfStock,
      showFastDeliveryOnly,
      productList,
      search,
      priceRange,
    },
    dispatch,
  } = useProduct();
  useToastCleaner();
  useDocumentTitle("Products");

  const [showFilter, setShowFilter] = useState(false);

  const sortPriceLowToHigh = () => {
    dispatch({ type: actions.PRICE_LOW_TO_HIGH });
  };

  const sortPriceHighToLow = () => {
    dispatch({ type: actions.PRICE_HIGH_TO_LOW });
  };

  const filterOutOfStock = () => {
    dispatch({ type: actions.FILTER_OUT_OF_STOCK });
  };

  const filterFastDelivery = () => {
    dispatch({ type: actions.FILTER_FAST_DELIVERY });
  };

  const clearAllFilters = () => {
    dispatch({ type: actions.CLEAR_ALL_FILTERS });
  };

  const searchProduct = (search) => {
    dispatch({ type: actions.UPDATE_SEARCH_TEXT, payload: search });
  };

  const handleSliderChange = (e) => {
    dispatch({
      type: actions.UPDATE_PRICE_RANGE,
      payload: { value: e.target.value },
    });
  };

  const sortedData = getSortedData({ sortBy, productList });
  const filteredData = getFilteredData({
    showOutOfStock,
    showFastDeliveryOnly,
    sortedData,
  });
  const priceRangeData = getPriceRangeData({ priceRange, filteredData });
  const searchedData = getSearchedData({ search, priceRangeData });

  const filterProps = {
    sortBy: sortBy,
    filterFastDelivery: filterFastDelivery,
    filterOutOfStock: filterOutOfStock,
    sortPriceHighToLow: sortPriceHighToLow,
    sortPriceLowToHigh: sortPriceLowToHigh,
    handleSliderChange: handleSliderChange,
    priceRange: priceRange,
  };

  return (
    <div className="product-container">
      <div className="h6 text--bold text--center">
        {loading ? (
          <span className="loading"></span>
        ) : (
          <span> Health & Supplements </span>
        )}
      </div>
      <FilterOptions
        searchedData={searchedData}
        searchProduct={searchProduct}
      />
      <div className="product__filter--wrapper">
        <div
          className={`${
            showFilter ? "product__filter--mobile" : "product__filter"
          } `}
        >
          <div className="filter__heading">
            <SecondaryButton
              className={showFilter ? "" : "button--outline-hidden margin--sm"}
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Apply" : "Filters"}
            </SecondaryButton>
            <PrimaryButton onClick={clearAllFilters}>Clear All</PrimaryButton>
          </div>
          <FilterSection {...filterProps} />
        </div>
        <div className={`${showFilter ? "hide" : "filter__panel--heading"}`}>
          <SecondaryButton onClick={() => setShowFilter(!showFilter)}>
            Filters
          </SecondaryButton>
          <PrimaryButton onClick={clearAllFilters}>Clear All</PrimaryButton>
        </div>
        <div>
          {searchedData.length > 0 ? (
            <ProductListing productList={searchedData} />
          ) : (
            search && (
              <span className="h6 text--center">
                No items found with {search}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const FilterOptions = ({ searchProduct, searchedData }) => (
  <div className="filter-options">
    <div className="input__search">
      <i className="fas fa-search fa-lg search__icon"></i>
      <input
        type="text"
        className="input search-bar"
        onChange={(e) => searchProduct(e.target.value)}
        placeholder="Search products"
      />
      <div className="text--secondary margin--sm text--center">
        {searchedData.length} Products
      </div>
    </div>
  </div>
);

const FilterSection = ({
  sortPriceLowToHigh,
  sortPriceHighToLow,
  sortBy,
  filterOutOfStock,
  filterFastDelivery,
  handleSliderChange,
  priceRange,
}) => (
  <div className="filter__section">
    <hr className="filter__divider"></hr>
    <fieldset className="fieldset--style spacing--vh">
      <legend> Price Sort by </legend>
      <div>
        <input
          onChange={sortPriceLowToHigh}
          checked={sortBy && sortBy === actions.PRICE_LOW_TO_HIGH}
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
          checked={sortBy && sortBy === actions.PRICE_HIGH_TO_LOW}
        />
        <label> High to Low </label>
      </div>
    </fieldset>
    <hr className="filter__divider"></hr>
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
    <hr className="filter__divider"></hr>
    <fieldset className="fieldset--style spacing-vh">
      <legend> Price Range</legend>
      <div className="price-range--align">
        <input
          type="range"
          min="100"
          max="1200"
          step="100"
          defaultValue={priceRange}
          onChange={handleSliderChange}
        />
        <label>Rs.{priceRange}</label>
      </div>
    </fieldset>
    <hr className="filter__divider"></hr>
  </div>
);

const SecondaryButton = ({ children, onClick, className }) => (
  <button
    className={`${className} button button--outline button--sm subtitle--sm`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Product;
