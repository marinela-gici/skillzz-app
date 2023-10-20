import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const ApplicationDetails = () => {
    const [application, setApplication] = useState({});
    const {id, applicationId} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/company/jobs/${id}/applications/${applicationId}`, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setApplication(res.data)
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <>
            {application &&
                <div className="min-h-[calc(100vh-64px)] p-8">
                    <div className="lg:w-2/3 w-full mx-auto p-12 rounded-md dark:dark:bg-gray-800 dark:text-white">
                        <Link className='flex items-center hover:underline mb-4'
                              to={`/dashboard/jobs/${id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWiph="1.5"
                                 stroke="currentColor" className="w-4 h-4 mr-2">
                                <path strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>

                            Back to your jobs</Link>
                            <div className="bg-white dark:bg-gray-700 overflow-hipen shadow rounded-lg border">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Details
                                    </h3>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                    <div className="sm:divide-y sm:divide-gray-200">
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <p className="text-sm font-medium text-gray-300">
                                                Full name
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                                {application.firstName} {application.lastName} 
                                            </p>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <p className="text-sm font-medium text-gray-300">
                                                Email address
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                                {application.email}
                                            </p>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <p class="text-sm font-medium text-gray-300">
                                                Message
                                            </p>
                                            <p class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                                {application.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ApplicationDetails;
