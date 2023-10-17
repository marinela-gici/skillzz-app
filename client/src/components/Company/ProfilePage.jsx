import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Button from "../Button.jsx";

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [vat, setVat] = useState("");
    const [email, setEmail] = useState("");
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/dashboard/profile', {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setVat(res.data.vat);
                setEmail(res.data.email);
            })
            .then((error) => console.log(error))
    }, []);

    const updateProfile = (e) => {
        e.preventDefault();
        axios
            .patch('http://localhost:8000/api/dashboard/profile', {
                name
            }, {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error);
                setValidation(error.response.data.errors)
            })
    }
    return (
        <div>
            <div className="min-h-[calc(100vh-64px)] p-8">
                <form
                    onSubmit={updateProfile}
                    className="md:w-1/3 sm:w-1/2 w-full mx-auto p-12 shadow-box rounded-md dark:bg-gray-800"
                >
                    <h2 className="center text-4xl font-bold dark:text-white text-center">
                        Update profile
                    </h2>
                    <div className="relative z-0 w-full my-6 group">
                        <input
                            value={name}
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
                            defaultValue={vat}
                            disabled={true}
                            type="text"
                            name="vat"
                            id="vat"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="vat"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Company VAT
                        </label>
                    </div>
                    <div className="relative z-0 w-full my-6 group">
                        <input
                            defaultValue={email}
                            disabled={true}
                            type="text"
                            name="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>

                    <Button value="Update" type="submit" />

                </form>
            </div>
        </div>
    )
}

export default ProfilePage