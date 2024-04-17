import axios from "axios";

export default class ProductService {
  getProducts(pageNo, pageSize) {
    return axios.get(
      `http://localhost:8080/api/products/getAllByPage?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }
  getAllProducts() {
    return axios.get("http://localhost:8080/api/products/getAll");
  }
  getByProductName(productName) {
    return axios.get(
      `http://localhost:8080/api/products/getByProductName?productName=${productName}`
    );
  }
  addProduct(product) {
    return axios.post(`http://localhost:8080/api/products/add`, product);
  }
  getProductWithCategoryName(categoryName) {
    return axios.get(
      `http://localhost:8080/api/products/api/products/getProductsWithCategoryDetailsByCategoryName?categoryName=${categoryName}`
    );
  }
}
