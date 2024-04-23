import React, { useState, useEffect } from "react";
import {
  MenuMenu,
  Menu,
  Container,
  Dropdown,
  Breadcrumb,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProductService from "../services/productService";
import CartSummary from "./CartSummary";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash"; // Import debounce from lodash
import "../SearchBar.css";
import "../Navijsx.css";
export default function Navi() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchChange = debounce((value) => {
    setSearchQuery(value);
    setDropdown(true);
  }, 1000);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    let { getAllProducts } = new ProductService();
    try {
      const result = await getAllProducts();
      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    debouncedSearchChange(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const [activeItem, setActiveItem] = useState("Products");
  const [dropdown, setDropdown] = useState(false);
  const handleItemClick = (name, path) => {
    setActiveItem(name);
    navigate(path);
    setDropdown(false);
  };
  const handleDropdownItemClick = (productName) => {
    handleItemClick(productName, `/products/${productName}`);
    setDropdown(false);
  };

  const sections = [
    {
      key: "Home",
      content: "Home",
      link: true,
      onClick: () => navigate("/products"),
    },
    {
      key: "Back",
      content: "Go back",
      link: true,
      onClick: () => window.history.back(),
    },
  ];
  return (
    <Menu fluid pointing fixed="top">
      <Container className="nav-container">
        <Menu.Item className="navigation-links">
          <Breadcrumb icon="right angle" sections={sections}></Breadcrumb>
        </Menu.Item>
        <Menu.Item
          active={activeItem === "Products"}
          onClick={() => handleItemClick("Products", "/")}
          name="Products">
          Products
        </Menu.Item>
        <Menu.Item
          active={activeItem === "Add product"}
          onClick={() => handleItemClick("Add product", "/product/add")}
          name="Add product">
          Add product
        </Menu.Item>
        <MenuMenu className="centered-items" position="right">
          <Menu.Item>
            <input
              icon="search"
              placeholder="Search products.."
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchQuery && (
              <Dropdown open={dropdown} loading={loading}>
                <Dropdown.Menu>
                  {filteredProducts.map((product) => (
                    <Dropdown.Item
                      onClick={() =>
                        handleDropdownItemClick(product.productName)
                      }
                      style={{ color: "black" }}
                      key={product.id}>
                      <Link to={`/products/${product.productName}`}>
                        <span style={{ color: "black" }}>
                          {product.productName}
                        </span>
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu.Item>
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
