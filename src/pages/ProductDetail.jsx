import React, { useState, useEffect } from "react";
import { Card, Image, Button, Grid, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import ProductService from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
export default function ProductDetail() {
  let { name } = useParams();

  const dispatch = useDispatch();

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added to cart!`);
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    toast.success(`${product.productName} removed from cart!`);
  };

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
      <Grid columns={1} celled inverted>
        <Grid.Column>
          <Segment size="small">
            {product && (
              <Card fluid>
                <Image wrapped size="big" ui={false} />
                <Card.Content>
                  <Card.Header>{product.productName}</Card.Header>
                  <Card.Meta>{product.category?.categoryName}</Card.Meta>
                  <Card.Description>{product.quantityPerUnit}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      onClick={() => handleAddtoCart(product)}
                      basic
                      color="green">
                      Add to cart
                    </Button>
                    <Button
                      onClick={() => handleRemoveFromCart(product)}
                      basic
                      color="red">
                      Remove from cart
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
