import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListContent,
  ListHeader,
  Segment,
  Button,
} from "semantic-ui-react";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
export default function CartDetail() {
  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added!`);
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    toast.success(`${product.productName} removed!`);
  };
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cartLength = cartItems.length > 0;
  return (
    <>
      <ToastContainer position="bottom-right" />
      {cartLength ? (
        cartItems.map((cartItem) => (
          <Segment inverted key={cartItem.product.id}>
            <List verticalAlign="middle" animated bulleted inverted relaxed>
              <ListItem>
                <ListContent>
                  <ListHeader>
                    {cartItem.quantity + " " + cartItem.product.productName}
                  </ListHeader>
                  <ListHeader>{cartItem.product.quantityPerUnit}</ListHeader>
                </ListContent>
              </ListItem>
            </List>
            <ListItem>
              <Button
                color="green"
                onClick={() => handleAddtoCart(cartItem.product)}>
                Increase
              </Button>
              <Button
                color="red"
                onClick={() => handleRemoveFromCart(cartItem.product)}>
                Remove from cart
              </Button>
            </ListItem>
          </Segment>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
}
