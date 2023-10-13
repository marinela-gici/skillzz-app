import React, {useEffect, useState} from 'react';
import axios from "axios";

const ApplicationModal = (props) => {
    const {job} = props;
    const [isActive, setIsActive] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [validation, setValidation] = useState({});

    useEffect(() => {
        axios
            .post('http://localhost:8000/api/applications', {
                    firstName,
                    lastName,
                    email,
                    message
                }
            )
            .then((res) => {
                console.log(res);
                setIsActive(false);

            })
    }, []);
    return (
        <div>
            <button data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    type="button"
                    onClick={() => setIsActive(true)}
            >

                Toggle modal
            </button>

            <div id="authentication-modal"
                 tabIndex="-1"
                 aria-hidden="true"
                 className={!isActive ? 'hidden' : 'flex items-center justify-center' + " bg-gray-700/50 dark:bg-slate-900/70 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"}>
                <div className="relative w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <button type="button"
                                onClick={() => setIsActive(false)}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3"
                                 aria-hidden="true"
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
                                application</h3>
                            <form className="space-y-6"
                                  action="#">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                        Name</label>
                                    <input type="text"
                                           name="name"
                                           id="name"
                                           onChange={(e) => setFirstName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                        Name</label>
                                    <input type="text"
                                           name="lastName"
                                           id="lastName"
                                           onChange={(e) => setLastName(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>

                                    <textarea id="message"
                                              rows="4"
                                              onChange={(e) => setMessage(e.target.value)}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-rose-400 dark:focus:border-rose-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></textarea>
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