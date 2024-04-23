import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListContent,
  ListHeader,
  Segment,
  Button,
  Grid,
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
      <List columns={2} container="true" divided stackable="true">
        {cartLength ? (
          cartItems.map((cartItem, index) => (
            <List key={index} textalign="center">
              <Segment inverted>
                <List animated inverted relaxed>
                  <ListItem>
                    <ListContent>
                      <ListHeader>
                        {cartItem.quantity + " " + cartItem.product.productName}
                      </ListHeader>
                      <ListHeader>
                        {cartItem.product.quantityPerUnit}
                      </ListHeader>
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
            </List>
          ))
        ) : (
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Segment>Cart is empty</Segment>
            </Grid.Column>
          </Grid.Row>
        )}
      </List>
    </>
  );
}
