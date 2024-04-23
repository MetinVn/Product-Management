import ProductList from "../pages/ProductList";
import { Segment, List } from "semantic-ui-react";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";
import CartDetail from "../pages/CartDetail";
import ProductAdd from "../pages/ProductAdd";
import Login from "../pages/UserLogin.jsx";
import Register from "../pages/UserRegistry.jsx";
import ProdFilterWithCat from "../pages/ProdFilterWithCat.jsx";
import ProtectedRoute from "../utilities/customFormControls/ProtectedRoute.jsx";
import Navi from "./Navi.jsx";
import Account from "../pages/UserAccount.jsx";
import Categories from "./Categories.jsx";
export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: "8em" }}>
        <Navi />
      </div>
      <Segment raised centered="true" stackable="true">
        <Categories />
        <List>
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route exact path="/products" element={<ProductList />} />
            <Route exact path="/products/:name" element={<ProductDetail />} />
            <Route exact path="/cart" element={<CartDetail />} />
            <Route exact path="/product/add" element={<ProductAdd />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/account"
              element={<ProtectedRoute element={<Account />} />}
            />
            <Route
              exact
              path="/products/productsWithCategoryNames"
              element={<ProdFilterWithCat />}
            />
          </Routes>
        </List>
      </Segment>
    </div>
  );
}
