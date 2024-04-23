import React, { useState, useEffect } from "react";
import { Image, Button, Segment, List, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import ProductService from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import prodImg from "../images/3073785.jpg";
export default function ProductDetail() {
  let { name } = useParams();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added to cart!`);
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    toast.success(`${product.productName} removed from cart!`);
  };
  const isProductInCart = (productId) =>
    cartItems.some((item) => item.product.id === productId);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let { getByProductName } = new ProductService();
    getByProductName(name)
      .then((result) => {
        setProduct(result.data.data);
      })
      .catch((error) => console.log(error));
  }, [name]);
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Segment inverted>
        {product && (
          <List divided relaxed size="large" verticalAlign="middle">
            <List.Item>
              <Image
                src={prodImg}
                centered
                ui={false}
                style={{ maxWidth: "200px", height: "auto" }}
              />
            </List.Item>
            <List.Item>
              <List.Header style={{ color: "white" }}>
                Product Name: {product.productName}
              </List.Header>
              <List.Description style={{ color: "white" }}>
                Price: {Math.ceil(product.unitPrice)}
              </List.Description>
              <List.Description style={{ color: "white" }}>
                Description: {product.quantityPerUnit}
              </List.Description>
            </List.Item>
            <List.Item>
              <div className="ui two buttons">
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
                <Button
                  disabled={!isProductInCart(product.id)}
                  onClick={() => handleRemoveFromCart(product)}
                  color="red"
                  inverted
                  fluid>
                  Remove from cart
                </Button>
              </div>
            </List.Item>
          </List>
        )}
      </Segment>
    </div>
  );
}
