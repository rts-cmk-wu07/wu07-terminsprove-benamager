import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi"
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { ColorRing } from "react-loader-spinner";
import { setCookie } from "react-use-cookie";

export default function LoginForm({ toggleLogin }) {
  const { authState, setAuthState } = useContext(AuthContext)

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios.post(`${import.meta.env.VITE_API_URL}/auth/token`, values)
        .then((response) => {
          setResponse(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message)
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    if (response) {
      setAuthState(prevState => ({ ...prevState, isAuthenticated: true, ...response }))
      setCookie("authCookie", JSON.stringify({ ...authState, isAuthenticated: true, ...response }), {
        days: 365,
        sameSite: "lax",
        secure: true,
      });
      toggleLogin()
    }
  }, [response])

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h4 className="">Log in</h4>
        <FiChevronDown onClick={toggleLogin} size="30px" className="self-end px-4 py-4 mb-2 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" aria-label="Toggle menu" />
      </div>
      <div className="mb-4">
        <input
          type="username"
          id="username"
          name="username"
          className={`bg-grey w-full pl-6 rounded-xl py-4 shadow-sm text-base focus:outline-none ${formik.touched.username && formik.errors.username ? "border-red-500" : ""}`}
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && <p className="text-red-500 text-sm mt-1">* {formik.errors.username}</p>}
      </div>
      <div className="mb-5">
        <input
          type="password"
          id="password"
          name="password"
          className={`bg-grey w-full py-4 pl-6 rounded-xl shadow-sm text-base focus:outline-none ${formik.touched.password && formik.errors.password ? "border-red-500" : ""}`}
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">* {formik.errors.password}</p>}
      </div>
      <button className="bg-primary h-[60px] text-center rounded-xl text-base hover:translate-x-4 active:translate-x-4 transition-transform flex items-center justify-center gap-4">
        {loading && <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          colors={["#e15b64", "#f47e60", "#abbd81", "#849b87"]}
        />}
        Login</button>

      {error ? <p className="self-end text-red-600 text-base py-1 mt-2 cursor-pointer">{error}</p> : null}
      <p className="self-end text-blue-600 text-base py-4 mt-2 cursor-pointer">Sign up instead?</p>
    </form>
  );
}