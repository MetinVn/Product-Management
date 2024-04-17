import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems";

const initialState = {
  cartItems: cartItems,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const { id } = action.payload;
      const existingCartItem = state.cartItems.find(
        (item) => item.product.id === id
      );

      if (existingCartItem) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedCartItems };
      } else {
        const newCartItem = {
          quantity: 1,
          product: action.payload,
        };
        return { ...state, cartItems: [...state.cartItems, newCartItem] };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}
