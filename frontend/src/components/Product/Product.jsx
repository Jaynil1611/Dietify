import React, { useState } from "react";
import { useProduct } from "../../contexts";
import { actions } from "../../reducers";
import ProductListing from "./ProductListing";
import {
  getFilteredData,
  getSearchedData,
  getSortedData,
  getPriceRangeData,
  getFilteredBrandData,
} from "./Filter";
import { PrimaryButton } from "./ProductListing";
import "./Product.css";
import { useDocumentBody, useDocumentTitle } from "../../utils";
import FilterSection, { FilterOptions } from "./FilterSection";

function Product({ loading }) {
  const {
    state: {
      sortBy,
      showOutOfStock,
      showFastDeliveryOnly,
      productList,
      search,
      priceRange,
      selectedBrands,
      brands,
    },
    dispatch,
  } = useProduct();
  useDocumentTitle("Products");

  const [showFilter, setShowFilter] = useState(false);
  useDocumentBody(showFilter);

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

  const updateBrandFilter = (e) => {
    dispatch({
      type: actions.UPDATE_BRAND_FILTER,
      payload: { brand: e.target.labels[0].htmlFor },
    });
  };

  const sortedData = getSortedData(sortBy, productList);
  const filteredData = getFilteredData({
    showOutOfStock,
    showFastDeliveryOnly,
    sortedData,
  });
  const selectedBrandData = getFilteredBrandData(selectedBrands, filteredData);
  const priceRangeData = getPriceRangeData(priceRange, selectedBrandData);
  const searchedData = getSearchedData(search, priceRangeData);

  const filterProps = {
    sortBy,
    filterFastDelivery,
    filterOutOfStock,
    sortPriceHighToLow,
    sortPriceLowToHigh,
    handleSliderChange,
    showOutOfStock,
    showFastDeliveryOnly,
    priceRange,
    brands,
    selectedBrands,
    updateBrandFilter,
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
        <div className="product__search">
          {searchedData.length > 0 ? (
            <ProductListing productList={searchedData} />
          ) : (
            <div className="product__search">
              {search ? (
                <div className="h6">
                  No items found for
                  <i>
                    <b>{search}</b>
                  </i>
                </div>
              ) : (
                <>{!loading && <div className="h6">No items found</div>}</>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SecondaryButton = ({ children, onClick, className }) => (
  <button
    className={`${className} button button--outline button--sm subtitle--sm`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Product;
