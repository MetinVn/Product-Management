export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";

export const filterByCategory = (categoryName) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: categoryName,
  };
};
