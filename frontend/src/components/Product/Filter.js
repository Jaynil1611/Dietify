import { actions } from "../../reducers";

const getSortedData = (sortBy, productList) => {
  return sortBy === actions.PRICE_LOW_TO_HIGH
    ? [...productList].sort(
        (item1, item2) => Number(item1.price) - Number(item2.price)
      )
    : sortBy === actions.PRICE_HIGH_TO_LOW
    ? [...productList].sort(
        (item1, item2) => Number(item2.price) - Number(item1.price)
      )
    : productList;
};

const getFilteredData = ({
  showOutOfStock,
  showFastDeliveryOnly,
  sortedData: productList,
}) => {
  return productList
    .filter(({ inStock }) => (showOutOfStock ? true : inStock))
    .filter(({ fastDelivery }) => (showFastDeliveryOnly ? fastDelivery : true));
};

const getPriceRangeData = (priceRange, productList) => {
  return productList.filter(({ price }) => price < Number(priceRange));
};

const matchData = (data, search) => data.toLowerCase().includes(search);

const compare = ({ name, brand }, search) => {
  return matchData(name, search) || matchData(brand, search);
};

const getSearchedData = (search, productList) => {
  return search
    ? productList.filter((product) => compare(product, search.toLowerCase()))
    : productList;
};

const getFilteredList = (list) => {
  return list.filter(({ inStock }) => inStock);
};

const getFilteredBrandData = (selectedBrands, productList) => {
  return selectedBrands.length > 0
    ? productList.filter(({ brand }) => selectedBrands.includes(brand))
    : productList;
};

export {
  getFilteredData,
  getSortedData,
  getSearchedData,
  getPriceRangeData,
  getFilteredList,
  getFilteredBrandData,
};
