import { FILTER_BY_CATEGORY } from "../actions/categoryActions";
import { categoryName } from "../initialValues/filterByCategory";

const initialState = {
  categoryName: categoryName,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_BY_CATEGORY:
      return { categoryName: action.payload };
    default:
      return state;
  }
}
