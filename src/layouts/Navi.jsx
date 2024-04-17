import { MenuMenu, MenuItem, Menu, Container } from "semantic-ui-react";
import CartSummary from "./CartSummary";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/actions/authActions";

export default function Navi() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(authUser(false));
    localStorage.clear();
    navigate("/login");
  }
  function handleSignIn() {
    navigate("/login");
  }
  function handleRegister() {
    navigate("/register");
  }
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem name="products">
          <Link to="/">Products</Link>
        </MenuItem>
        <MenuItem name="Urun ekle">
          <Link to="/product/add">Add product</Link>
        </MenuItem>
        <MenuMenu position="right">
          {cartItems.length > 0 && <CartSummary />}
          {isAuthenticated ? (
            <SignedIn signOut={handleSignOut} />
          ) : (
            <SignedOut signIn={handleSignIn} signOut={handleRegister} />
          )}
        </MenuMenu>
      </Container>
    </Menu>
  );
}
