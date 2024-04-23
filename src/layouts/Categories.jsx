import { MenuItem, Menu } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../store/actions/categoryActions";
export default function Categories() {
  const categories = [
    "Beverages",
    "Condiments",
    "Confections",
    "Dairy Products",
    "Grains,Cereals",
    "Meat,Poultry",
    "Produce",
    "Seafood",
  ];
  const { categoryName } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  function filterProductsByCategoryName(name) {
    dispatch(filterByCategory(name));
    navigate("/products/productsWithCategoryNames");
  }

  const showCategories =
    location.pathname === "/" ||
    location.pathname === "/products" ||
    location.pathname === "/products/productsWithCategoryNames";

  return (
    <div>
      {showCategories && (
        <Menu pointing fluid stackable secondary>
          {categories.map((category, key) => (
            <MenuItem
              active={categoryName === category ? true : false}
              style={{ cursor: "pointer" }}
              onClick={() => filterProductsByCategoryName(category)}
              key={key}
              name={category}
            />
          ))}
        </Menu>
      )}
    </div>
  );
}
