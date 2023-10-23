import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


const Dashboard = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/company/dashboard", {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setCount(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <div className="flex flex-wrap p-4 border-gray-200 dark:border-gray-700">
                <div className="w-full lg:w-1/2 mb-4 px-2">
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:text-white dark:bg-gray-800 dark:border-gray-700">
                        <p>Total jobs posted</p>
                        <div className="flex items-center justify-between pt-6">
                            <p className="text-3xl">{count}</p>
                            <Link to={'/dashboard/jobs/create'}
                                  className="bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor"
                                     className="w-5 h-5 me-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                                <span>Create job</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;