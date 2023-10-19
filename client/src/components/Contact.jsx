import React, {useRef, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {toast} from "react-toastify";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const captchaRef = useRef(null);

    const onSubmit = (e) =>{
        e.preventDefault();
        const token = captchaRef.current.getValue();
        console.log(token);
        captchaRef.current.reset();
        axios
            .post('http://localhost:8000/api/contact', {
                name,
                email,
                subject,
                message,
                token
            })
            .then(res => {
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");

                toast.success('Message sent successfully!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    theme: "colored",
                });
            })
    }

    return (<div className="container mx-auto">
            <div className="flex flex-wrap items-center container pt-4 p-6 rounded-md my-8">
                <div className="w-full md:w-1/2 mb-4 p-8">
                    <div className="mx-auto lg:max-w-[70%]">
                        <form onSubmit={onSubmit} className="p-5 bg-white dark:bg-gray-800 h-[500px]">
                            <h1 className="text-center text-4xl pb-6 text-emerald-400 dark:text-rose-400">Get in
                                touch</h1>
                            <div className="mb-6">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <input type="name"
                                           id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 dark:focus:ring-rose-500 dark:focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                           placeholder="Name" />
                                </label>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <input type="email"
                                           id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 dark:focus:ring-rose-500 dark:focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                           placeholder="Email" />
                                </label>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="subject"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <input type="text"
                                           id="subject"
                                           placeholder="Subject"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 dark:focus:ring-rose-500 dark:focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                </label>
                            </div>
                            <div className="mb-6">

                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <textarea id="message"
                                          rows="4"
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 dark:focus:ring-rose-500 dark:focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                          placeholder="Leave a message..."></textarea>
                                </label>
                            </div>
                            <ReCAPTCHA sitekey="6LcRQrEoAAAAAKqIchlVdNNqRxa1AptFq293R-Kx" ref={captchaRef} />
                            <button
                                className="dark:bg-rose-400 dark:hover:bg-rose-500 bg-emerald-400 hover:bg-emerald-600 rounded-md md:px-6 px-4 md:py-3 py-2 text-lg font-semibold text-white shadow-sm"
                            >Send message
                            </button>
                        </form>
                    </div>
                </div>

                <div className=" w-full md:w-1/2 mb-4 p-8">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47934.065942068024!2d19.776623521706558!3d41.33324180434748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310470fac5db%3A0x40092af10653720!2sTirana%2C%20Albania!5e0!3m2!1sen!2s!4v1697312477928!5m2!1sen!2s"
                            width="100%"
                            height="500"
                            style={{
                                border: 0,
                                allowFullScreen: "",
                                loading: "lazy",
                                referrerPolicy: "no-referrer-when-downgrade"
                            }}></iframe>
                </div>
            </div>


        </div>)
}
export default Contact;