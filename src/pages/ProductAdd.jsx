import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Button, Label, Segment } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import MetinVnTextInput from "../utilities/customFormControls/MetinVnTextInput.jsx";
import ProductService from "../services/productService";
import { useNavigate } from "react-router-dom";
export default function ProductAdd() {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    productName: "",
    unitPrice: "",
    unitsInStock: "",
    quantityPerUnit: "",
  };

  const schema = Yup.object({
    productName: Yup.string().required("This field is required!"),
    unitPrice: Yup.number().required("This field is required!"),
    quantityPerUnit: Yup.string(),
    unitsInStock: Yup.number().required("This field is required!"),
  });

  async function handleSubmit(values) {
    console.log(values);
    setLoginLoading(true);
    const { addProduct } = new ProductService();
    try {
      await addProduct(values);
      toast.success("Product added!");
      setTimeout(() => {
        setLoginLoading(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error);
      setLoginLoading(false);
    }
  }

  return (
    <Segment loading={loginLoading}>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}>
        <Form className="ui form">
          <ToastContainer position="bottom-right" />
          <Label>Product Details</Label>
          <MetinVnTextInput name="productName" placeholder="Product name" />
          <MetinVnTextInput name="unitPrice" placeholder="Price" />
          <MetinVnTextInput name="unitsInStock" placeholder="Left in stock" />
          <MetinVnTextInput name="quantityPerUnit" placeholder="Details" />
          <Button
            style={{ margin: "0.5em" }}
            fluid
            loading={loginLoading}
            type="submit"
            primary>
            Add
          </Button>
        </Form>
      </Formik>
    </Segment>
  );
}
