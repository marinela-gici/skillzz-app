import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import defaultLogo from '../../assets/default-logo.svg';

const CompanyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/company/jobs', {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setJobs(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {jobs.length === 0 &&  <p className="text-xl text-red-600 font-bold">No jobs yet!</p>}
            {jobs.length > 0 && jobs.map((job, index) => {
                return (
                    <div key={index}
                         className="flex flex-wrap items-center container pt-4 border overflow-hidden hover:border-emerald-500 dark:hover:border-rose-400 dark:bg-gray-800 dark:text-white rounded-md my-8 bg-white">
                        <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                            <img className='w-[100px]' src={job.company.logo ? (import.meta.env.VITE_IMAGES_BASE_URL+job.company.logo) : defaultLogo} />
                        </div>

                        <div className="w-full flex flex-col justify-center items-center md:w-1/5 mb-4">
                            <p>{job.title}</p>
                            <p className="text-gray-500 dark:text-gray-400">{job.category}</p>
                        </div>
                        <div className="w-full md:w-1/5 mb-4 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor"
                                 className="w-4 h-4 mr-1 text-emerald-400 dark:text-rose-400">
                                <path strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>

                            {job.location}
                        </div>
                        <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                            ${job.salary}
                        </div>
                        <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                            {job.employmentType}
                        </div>
                        <div className="w-full block lg:text-left text-center lg:flex justify-between items-center bg-main dark:bg-gray-900 py-4 px-6">
                            <p>Experience: {job.experience}</p>
                            <div>
                                <div>
                                    <button onClick={() => navigate(`/dashboard/jobs/${job._id}`)}
                                            className="my-3 lg:my-0 bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 mr-2 rounded inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor"
                                             className="w-4 h-4 me-2">
                                            <path strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                        View job
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                )
            })}

        </>
    )
}

export default CompanyJobs;