import React, {useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import Button from "./Button";
import ImageUpload from "./ImageUpload.jsx";

const Register = () => {
    const [name, setName] = useState("");
    const [vat, setVat] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validation, setValidation] = useState({});
    const [imageLoading, setImageLoading] = useState(false);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const navigate = useNavigate();

    const onImageUpload = (info) => {
        if (info.file.status === "uploading") {
            setImageLoading(true);
            return;
        }

        if (info.file.status === "done") {
            getBase64(info.file.originFileObj).then((file) => {
                setImgUrl(file);
                setImgTitle(info.file.name);
                setImageLoading(false);
            });
        }
    };

    const removeLogo = () => {
        setImgUrl(null);
    };

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

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
                    logo: imgUrl
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

                <div className='my-5'>
                    <ImageUpload
                        loading={imageLoading}
                        imgUrl={imgUrl}
                        title={imgTitle}
                        handleChange={onImageUpload}
                        onImageRemove={removeLogo}
                    />
                </div>

                <Button value="Signup" type="submit"  />
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
