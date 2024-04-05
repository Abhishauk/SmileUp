import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { userRegister } from "../../Api/UserAxios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Users/Header";

const Signup = () => {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    UserName: yup.string().required("UserName is required"),
    Name: yup.string().required("Name is required"),
    Email: yup.string().email("Invalid email").required("Email is required"),
    Phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    Password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  const initialValues = {
    UserName: "",
    Name: "",
    Email: "",
    Phone: "",
    DOB: null,
    Password: ""
  };

  const [dob, setDob] = useState(null);

  const handleDobChange = (date) => {
    setDob(date);
  };

  async function getUser(values) {
    userRegister(values)
      .then((response) => {
        navigate("/userLogin");
      })
      .catch((error) => {
        console.error("1212212", error.response.data.msg);
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000
        });
      });
  }

  const handleSubmit = (values, { setFieldValue }) => {
    values.DOB = dob ? dob.toISOString() : null;

    getUser(values);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="fixed top-0 w-full z-50"><Header /></div>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-64 mt-16">
          <h2 className="text-sm font-semibold mb-4 text-center">Create New User</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-2">
                <Field
                  type="text"
                  name="UserName"
                  placeholder="Username"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-pink-500 text-xs"
                />
                <ErrorMessage
                  name="UserName"
                  component="div"
                  className="text-red-600 text-xxs"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="text"
                  name="Name"
                  placeholder="Name"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
                />
                <ErrorMessage
                  name="Name"
                  component="div"
                  className="text-red-600 text-xxs"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="text"
                  name="Email"
                  placeholder="Email"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
                />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-red-600 text-xxs"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="text"
                  name="Phone"
                  placeholder="Phone"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
                />
                <ErrorMessage
                  name="Phone"
                  component="div"
                  className="text-red-600 text-xxs"
                />
              </div>
              <div className="mb-2">
                <input
                  type="hidden"
                  name="DOB"
                  value={dob ? dob.toISOString() : ""}
                />
                <DatePicker
                  selected={dob}
                  onChange={handleDobChange}
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date of Birth"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="text"
                  name="Password"
                  placeholder="Password"
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-red-600 text-xxs"
                />
              </div>
              <div className="flex justify-between mb-2">
                <a
                  href="/userLogin"
                  className="text-blue-300 hover:underline text-xs"
                >
                  Already have an account? Login
                </a>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-300 text-white px-3 py-1 rounded-md hover:bg-blue-400 text-xs"
                >
                  Create New User
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
