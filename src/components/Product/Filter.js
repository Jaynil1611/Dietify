import { Actions } from "../../reducers";

const getSortedData = (sortBy, productList) => {
  return sortBy === Actions.PRICE_LOW_TO_HIGH
    ? [...productList].sort(
        (item1, item2) => Number(item1.price) - Number(item2.price)
      )
    : sortBy === Actions.PRICE_HIGH_TO_LOW
    ? [...productList].sort(
        (item1, item2) => Number(item2.price) - Number(item1.price)
      )
    : productList;
};

const getFilteredData = (showOutOfStock, showFastDeliveryOnly, productList) => {
  return productList
    .filter(({ inStock }) => (showOutOfStock ? true : inStock))
    .filter(({ fastDelivery }) => (showFastDeliveryOnly ? fastDelivery : true));
};

const matchData = (data, search) => data.toLowerCase().includes(search);

const compare = ({ name, brand }, search) => {
  return matchData(name, search) || matchData(brand, search);
};

const getSearchedData = (productList, search) => {
  return search
    ? productList.filter((product) => compare(product, search.toLowerCase()))
    : productList;
};

export { getFilteredData, getSortedData, getSearchedData };
