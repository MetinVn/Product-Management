import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import UndefinedTextInput from "../utilities/customFormControls/UndefinedTextInput.jsx";
import ProductService from "../services/productService";
export default function ProductAdd() {
  const [loginLoading, setLoginLoading] = useState(false);
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
    setLoginLoading(true);
    const { addProduct } = new ProductService();
    await addProduct(values)
      .then(() => {
        setTimeout(() => {
          setLoginLoading(false);
          toast.success("Product added!");
        }, 2000);
      })
      .then((error) => console.log(error));
  }

  return (
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
        <UndefinedTextInput name="productName" placeholder="Product name" />
        <UndefinedTextInput name="unitPrice" placeholder="Price" />
        <UndefinedTextInput name="unitsInStock" placeholder="Left in stock" />
        <UndefinedTextInput name="quantityPerUnit" placeholder="Details" />
        <Button fluid loading={loginLoading} type="submit" primary>
          Add
        </Button>
      </Form>
    </Formik>
  );
}
