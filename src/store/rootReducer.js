import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import categoryReducer from "./reducers/categoryReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  auth: authReducer,
});

export default rootReducer;
