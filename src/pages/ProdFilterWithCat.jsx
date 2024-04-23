import React, { useEffect, useState } from "react";
import ProductService from "../services/productService";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
  Icon,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProdFilterWithCat() {
  const { cartItems } = useSelector((state) => state.cart);
  const isProductInCart = (productId) =>
    cartItems.some((item) => item.product.id === productId);

  const dispatch = useDispatch();
  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added to cart!`);
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    toast.success(`${product.productName} removed from cart!`);
  };

  const [response, setResponse] = useState([]);
  const { categoryName } = useSelector((state) => state.category);
  useEffect(() => {
    if (categoryName) {
      let { getProductWithCategoryName } = new ProductService();
      getProductWithCategoryName(categoryName)
        .then((resp) => {
          setResponse(resp.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [categoryName]);

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Table celled inverted compact singleLine>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product name</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Details</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {response.map((product) => (
            <TableRow key={product.id}>
              <TableCell selectable>
                <Link to={`/products/${product.productName}`}>
                  {product.productName}
                </Link>
              </TableCell>
              <TableCell>{product.quantityPerUnit}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>{Math.floor(product.unitPrice)}</TableCell>
              <TableCell>
                <Button
                  color="green"
                  size="small"
                  onClick={() => handleAddtoCart(product)}
                  disabled={isProductInCart(product.id)}>
                  {isProductInCart(product.id) ? (
                    <Icon name="checkmark" />
                  ) : (
                    "Add to cart"
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  disabled={!isProductInCart(product.id)}
                  color="red"
                  onClick={() => handleRemoveFromCart(product)}>
                  Remove from cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
