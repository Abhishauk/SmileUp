import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { userLogin } from "../../Api/UserAxios.js";
import { setLogin } from "../../state/state.js";
import {useDispatch} from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validationSchema = yup.object({
    Email: yup.string().email("Invalid email").required("Email is required"),
    Password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  const initialValues = {
    Email: "",
    Password: ""
  };

 

  async function getUser(values) {
      console.log("111");
      userLogin(values).then((response)=>{
        console.log("?>?>?>?>?>",response.data.user);

        dispatch( setLogin(
          {user:response.data.user}
          ))

        navigate("/Home")

      }). catch ((error)=> {
      console.error(error.response.data.msg);
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    })
  }

  const handleSubmit = (values) => {
    console.log(values);
    getUser(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="text"
                name="Email"
                placeholder="Email"
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-pink-500"
              />
              <ErrorMessage
                name="Email"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="Password"
                placeholder="Password"
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-pink-500"
              />
              <ErrorMessage
                name="Password"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex justify-between mb-4">
              <a href="#" className="text-pink-500 hover:underline">
                Didn't have an account? Signup
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
              >
                LOGIN
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
