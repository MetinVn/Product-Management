import { USER_AUTHENTICATED } from "../actions/authActions";
const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const initialState = {
  isAuthenticated: isAuthenticated,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}
