import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";


const ApplicationModal = (props) => {
    const {job, socket} = props;
    const [isActive, setIsActive] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [validation, setValidation] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/api/applications', {
                    firstName,
                    lastName,
                    email,
                    message,
                    job: job._id
                }
            )
            .then((res) => {
                console.log(res);
                setIsActive(false);
                resetForm();
                socket.emit("newApplication", res.data);

                toast.success('Congrats! Your application has been received!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    theme: "colored",
                })

            })
            .catch(err => {
                console.log(err);
                setValidation(err.response.data.errors)
            })
    }

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setValidation({});
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsActive(true)}
                className="dark:bg-rose-400 dark:hover:bg-rose-500 bg-emerald-400 hover:bg-emerald-600 rounded-md px-6 py-3 text-lg font-semibold text-white shadow-sm mr-2.5 mt-4">Apply
                now
            </button>


            <div
                className={!isActive ? 'hidden' : 'flex items-center justify-center' + " bg-gray-700/50 dark:bg-slate-900/70 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full"}>
                <div className="relative w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <button type="button"
                                onClick={() => {
                                    setIsActive(false);
                                    resetForm();
                                }}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Send your
                                application for <span className="text-emerald-400 dark:text-rose-500">{job.title}</span> position</h3>
                            <form className="space-y-6"
                                  onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                        Name</label>
                                    <input type="text"
                                           name="name"
                                           id="name"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                    {validation.firstName ? (
                                        <p className="text-sm text-red-600 font-bold">
                                            {validation.firstName.message}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastName"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                        Name</label>
                                    <input type="text"
                                           name="lastName"
                                           id="lastName"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                    {validation.lastName ? (
                                        <p className="text-sm text-red-600 font-bold">
                                            {validation.lastName.message}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                    {validation.email ? (
                                        <p className="text-sm text-red-600 font-bold">
                                            {validation.email.message}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="message"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>

                                    <textarea id="message"
                                              rows="4"
                                              value={message}
                                              onChange={(e) => setMessage(e.target.value)}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">

                                    </textarea>
                                    {validation.message ? (
                                        <p className="text-sm text-red-600 font-bold">
                                            {validation.message.message}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <button type="submit"
                                        className="w-full text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-rose-400 dark:hover:bg-rose-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationModal;