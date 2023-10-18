import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";

const Register = () => {
  const [name, setName] = useState("");
  const [vat, setVat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/register",
        {
          name,
          vat,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setValidation(err.response.data.errors);
      });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-8">
      <form
        onSubmit={register}
        className="md:w-1/3 sm:w-1/2 w-full mx-auto p-12 shadow-box rounded-md dark:bg-gray-800"
      >
        <h2 className="center text-4xl font-bold dark:text-white text-center">
          Sign up to hire talent
        </h2>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Compnay name
          </label>
          {validation.name ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.name.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="text"
            name="vat"
            id="vat"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setVat(e.target.value)}
          />
          <label
            htmlFor="vat"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company VAT
          </label>
          {validation.vat ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.vat.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="text"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {validation.email ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.email.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {validation.password ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.password.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="confirm-password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {validation.confirmPassword ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.confirmPassword.message}
            </p>
          ) : (
            ""
          )}
        </div>


        <div className="relative z-0 w-full my-6 group">

          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

        </div>

        <Button value="Signup" type="submit" />
        <p className="my-6 dark:text-white">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 font-bold">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
