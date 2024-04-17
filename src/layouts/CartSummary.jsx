import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownDivider,
  Label,
} from "semantic-ui-react";
export default function CartSummary() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div>
      <Dropdown item text="Cart">
        <DropdownMenu>
          {cartItems.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}
              {" : "}
              <Label>{cartItem.quantity}</Label>
            </DropdownItem>
          ))}

          <DropdownDivider />
          <DropdownItem as={NavLink} to="/cart">
            Go to cart
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
