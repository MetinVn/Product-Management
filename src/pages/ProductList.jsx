import { useEffect, useState } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Menu,
  Table,
  Button,
} from "semantic-ui-react";
import ProductService from "../services/productService";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addToCart, removeFromCart } from "../store/actions/cartActions";

export default function ProductList() {
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useDispatch();

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added to cart!`);
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    toast.success(`${product.productName} removed from cart!`);
  };
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 10;
  const [pageLimit, setLimit] = useState(0);

  const fetchProducts = async (page) => {
    let { getProducts, getAllProducts } = new ProductService();
    try {
      const result = await getProducts(page, pageSize);
      setProducts(result.data.data);
      setPageNo(page);
      if (firstTime) {
        const totalItemsResult = await getAllProducts();
        const totalItems = totalItemsResult.data.data.length;
        const pages = Math.ceil(totalItems / pageSize);
        setLimit(pages);
        setFirstTime(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(pageNo);
  }, [pageNo]);

  const handlePageChange = (newPageNo) => {
    setPageNo(newPageNo);
  };
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Table inverted color="blue" celled compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product name</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Left in stock</TableHeaderCell>
            <TableHeaderCell>Details</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell selectable collapsing>
                <Link to={`/products/${product.productName}`}>
                  {product.productName}
                </Link>
              </TableCell>
              <TableCell>{Math.floor(product.unitPrice)}</TableCell>
              <TableCell>{product.unitsInStock}</TableCell>
              <TableCell>{product.quantityPerUnit}</TableCell>
              <TableCell>{product.category?.categoryName}</TableCell>
              <TableCell>
                <Button color="green" onClick={() => handleAddtoCart(product)}>
                  Add to cart
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="red"
                  onClick={() => handleRemoveFromCart(product)}>
                  Remove from cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan={pageLimit}>
              <Menu floated="right" pagination>
                {Array.from({ length: pageLimit }, (_, index) => (
                  <MenuItem
                    key={index + 1}
                    as="a"
                    active={pageNo === index + 1}
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Menu>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
