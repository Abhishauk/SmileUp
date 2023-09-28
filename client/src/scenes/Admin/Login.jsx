import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { adminLogin } from '../../Api/AdminAxios';
import {useNavigate} from "react-router-dom"


const AdminLogin = () => {
  const navigate = useNavigate()
  const validationSchema = yup.object({
    Email: yup.string().email("Invalid email").required("Email is required"),
    Password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  const initialValues = {
    Email:"",
    Password:""
  };

  async function getUser(values) {
    adminLogin(values).then((response) =>{
      navigate("/AdminPanel")

    }).catch ((error) =>{
      console.error(error);
    })
  }

  const handleSubmit = (values) => {
    console.log(values);
    getUser(values)
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
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
                Did'nt have an account? Signup
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
    </div>
  );
};

export default AdminLogin;
