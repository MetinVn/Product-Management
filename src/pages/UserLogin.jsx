import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button, Message, Segment } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import MetinVnTextInput from "../utilities/customFormControls/MetinVnTextInput.jsx";
import UserService from "../services/userService.js";
import { useDispatch } from "react-redux";
import { authUser } from "../store/actions/authActions.js";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [message, setMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSubmit(values) {
    setLoginLoading(true);
    let { userAuth } = new UserService();
    try {
      await userAuth(values);
      dispatch(authUser(true));
      toast.success("Successful!");
      setTimeout(() => {
        setLoginLoading(false);
        navigate("/account");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error);
      setLoginLoading(false);
    }
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object({
    email: Yup.string().email().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  return (
    <Segment color="green" loading={loginLoading}>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
          localStorage.setItem("userForm", JSON.stringify(values));
        }}>
        <Form autoComplete="on" className="ui form">
          <ToastContainer position="bottom-right" />
          <MetinVnTextInput label="Email" name="email" placeholder="email" />
          <MetinVnTextInput
            label="Password"
            name="password"
            placeholder="password"
          />
          <Button fluid primary type="submit">
            Login
          </Button>
          {message ? (
            <div className="block">
              <Message compact size="small" color="red">
                {message}
              </Message>
            </div>
          ) : (
            ""
          )}
        </Form>
      </Formik>
    </Segment>
  );
}
