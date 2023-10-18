import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-wrap p-4 border-gray-200 dark:border-gray-700">
                <div className="w-full lg:w-1/2 mb-4 px-2">
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:text-white dark:bg-gray-800 dark:border-gray-700">
                        <p>Total job posted</p>
                        <div className="flex items-center justify-between pt-6">
                            <p className="text-3xl">20</p>
                            <Link to={'/dashboard/jobs/create'} className="bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor"
                                     className="w-5 h-5 me-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                                <span>Create job</span>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="w-full lg:w-1/2 mb-4 px-2">
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:text-white dark:bg-gray-800 dark:border-gray-700">
                        <p>Total applicants</p>
                        <div className="flex items-center justify-between pt-6">
                            <p className="text-3xl">200</p>
                            <Link to={'/dashboard/jobs/applications'} className="bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor"
                                     className="w-6 h-6 me-2">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                                <span>View applicants</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Dashboard;