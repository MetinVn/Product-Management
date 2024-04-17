import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UndefinedTextInput from "../utilities/customFormControls/UndefinedTextInput.jsx";
import UserService from "../services/userService.js";
import { useDispatch } from "react-redux";
import { authUser } from "../store/actions/authActions.js";
export default function Login() {
  const [isValidated, setValid] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object({
    email: Yup.string().required("This field is required!"),
    password: Yup.string()
      .min(6)
      .max(15)
      .required("Your password must contain min 5 and max 16 characters long"),
  });

  function handleSubmit(values) {
    setRegisterLoading(true);
    let { addUser } = new UserService();
    addUser(values).then((data) => {
      if (data.data.success) {
        toast.success("User successfully added!");
        setValid(true);
      } else {
        toast.error("Failed to add user!");
        setRegisterLoading(false);
      }
    });
  }
  if (isValidated) {
    setTimeout(() => {
      dispatch(authUser(true));
      setRegisterLoading(false);
      navigate("/account");
    }, 2000);
  }

  return (
    <Formik
      validateOnMount
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
        localStorage.setItem("userReg", JSON.stringify(values));
      }}>
      <Form className="ui form">
        <ToastContainer position="bottom-right" />
        <UndefinedTextInput label="Email" name="email" placeholder="email" />
        <UndefinedTextInput
          label="Password"
          name="password"
          placeholder="password"
        />
        <Button fluid loading={registerLoading} primary type="submit">
          Register
        </Button>
      </Form>
    </Formik>
  );
}
