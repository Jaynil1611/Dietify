import React from "react";
import { actions } from "../../reducers";
import { checkBrandExists } from "../../utils";

const FilterSection = ({
  sortPriceLowToHigh,
  sortPriceHighToLow,
  sortBy,
  showOutOfStock,
  showFastDeliveryOnly,
  filterOutOfStock,
  filterFastDelivery,
  handleSliderChange,
  priceRange,
  brands,
  selectedBrands,
  updateBrandFilter,
}) => (
  <div className="filter__section">
    <hr className="filter__divider"></hr>
    <fieldset className="fieldset--style spacing--vh">
      <legend className="text--bold"> Price Sort by </legend>
      <div className="product__brand">
        <input
          onChange={sortPriceLowToHigh}
          checked={sortBy && sortBy === actions.PRICE_LOW_TO_HIGH}
          type="radio"
          id="low_to_high"
          name="sort"
        />
        <label htmlFor="low_to_high"> Low to High </label>
      </div>
      <div className="product__brand">
        <input
          onChange={sortPriceHighToLow}
          type="radio"
          name="sort"
          id="high_to_low"
          checked={sortBy && sortBy === actions.PRICE_HIGH_TO_LOW}
        />
        <label htmlFor="high_to_low"> High to Low </label>
      </div>
    </fieldset>
    <hr className="filter__divider"></hr>
    <fieldset className="fieldset--style spacing--vh">
      <legend className="text--bold"> Availability </legend>
      <div className="product__brand">
        <input
          id="out_of_stock"
          checked={showOutOfStock}
          onChange={filterOutOfStock}
          type="checkbox"
        />
        <label htmlFor="out_of_stock"> Include Out of Stock </label>
      </div>
      <div className="product__brand">
        <input
          id="fast_delivery"
          checked={showFastDeliveryOnly}
          onChange={filterFastDelivery}
          type="checkbox"
        />
        <label htmlFor="fast_delivery"> Fast Delivery </label>
      </div>
    </fieldset>
    <hr className="filter__divider"></hr>
    <fieldset className="fieldset--style spacing-vh">
      <legend className="text--bold"> Price Range</legend>
      <div className="price-range--align">
        <input
          type="range"
          min="100"
          max="1200"
          step="100"
          value={priceRange}
          onChange={handleSliderChange}
        />
        <label>Rs.{priceRange}</label>
      </div>
    </fieldset>
    <hr className="filter__divider"></hr>
    <>
      <fieldset className="fieldset--style spacing--vh">
        <legend className="text--bold"> Brands </legend>
        {brands.map((brand, index) => {
          return (
            <div key={index} className="product__brand">
              <input
                id={brand}
                checked={checkBrandExists(selectedBrands, brand)}
                onChange={updateBrandFilter}
                type="checkbox"
              />
              <label htmlFor={brand}> {brand} </label>
            </div>
          );
        })}
        <hr className="filter__divider"></hr>
      </fieldset>
    </>
  </div>
);

export const FilterOptions = ({ searchProduct, searchedData }) => (
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

export default FilterSection;
