import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { userLogin } from "../../Api/UserAxios.js";
import { setLogin } from "../../state/slice.js";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Users/Header.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    UserName: yup.string().required("Username is required"),
    Password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  const initialValues = {
    UserName: "",
    Password: ""
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
  }, []);

  async function getUser(values) {
    userLogin(values)
      .then((response) => {
        console.log(response.data.token);
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token
          })
        );

        navigate("/Home");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000
        });
      });
  }

  const handleSubmit = (values) => {
    getUser(values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="fixed top-0 w-full z-50"><Header/></div>
    
      <div className="bg-white p-6 rounded shadow-md w-64 mt-20">
        <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>

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
                className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
              />
              <ErrorMessage
                name="UserName"
                component="div"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="mb-2">
              <Field
                type="password"
                name="Password"
                placeholder="Password"
                className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-400 text-xs"
              />
              <ErrorMessage
                name="Password"
                component="div"
                className="text-red-600 text-xs"
              />
            </div>

            <div className="flex justify-between mb-2">
              <a
                href="/userSignup"
                className="text-blue-400 hover:underline text-xs"
              >
                Didn't have an account? Signup
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-300 text-white px-3 py-1 rounded-md hover:bg-cyan-500 text-sm"
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
