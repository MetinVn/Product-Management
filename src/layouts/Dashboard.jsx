import Categories from "./Categories";
import ProductList from "../pages/ProductList";
import { GridRow, GridColumn, Grid } from "semantic-ui-react";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";
import CartDetail from "../pages/CartDetail";
import ProductAdd from "../pages/ProductAdd";
import login from "../pages/UserLogin.jsx";
import register from "../pages/UserRegistry.jsx";
import ProdFilterWithCat from "../pages/ProdFilterWithCat.jsx";
import ProtectedRoute from "../utilities/customFormControls/ProtectedRoute.jsx";
import Navi from "./Navi.jsx";
import Account from "../pages/UserAccount.jsx";
export default function Dashboard() {
  return (
    <div>
      <Navi />
      <Grid inverted columns={3} divided centered doubling>
        <GridRow>
          <Categories />
          <GridColumn width={12}>
            <Routes>
              <Route exact path="/" Component={ProductList} />
              <Route exact path="/products" Component={ProductList} />
              <Route exact path="/products/:name" Component={ProductDetail} />
              <Route exact path="/cart" Component={CartDetail} />
              <Route exact path="/product/add" Component={ProductAdd} />
              <Route exact path="/login" Component={login} />
              <Route exact path="/register" Component={register} />
              <Route
                exact
                path="/account"
                element={<ProtectedRoute element={Account} />}
              />
              <Route
                exact
                path="/products/productsWithCategoryNames"
                Component={ProdFilterWithCat}
              />
            </Routes>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
