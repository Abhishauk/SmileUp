import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { userRegister } from "../../Api/UserAxios";
import { useNavigate} from "react-router-dom"


const Signup = () => {
  const navigate = useNavigate()
  const validationSchema = yup.object({
    Name: yup.string().required("Name is required"),
    Email: yup.string().email("Invalid email").required("Email is required"),
    Phone: yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    Password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  const initialValues = {
    Name: "",
    Email: "",
    Phone: "",
    Password: ""
  };

  async function getUser(values) {
    userRegister(values).then((response) =>{
      navigate("/userLogin")
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
        <h2 className="text-2xl font-semibold mb-4 text-center">SignUp</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="text"
                name="Name"
                placeholder="Name"
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-pink-500"
              />
              <ErrorMessage
                name="Name"
                component="div"
                className="text-red-600"
              />
            </div>
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
                name="Phone"
                placeholder="Phone"
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-pink-500"
              />
              <ErrorMessage
                name="Phone"
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
                Already have an account? Login
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
              >
                SIGNUP
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
