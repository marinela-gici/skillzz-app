import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

const ShowLatestJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(
                "http://localhost:8000/api/jobs",
                {
                    params: {
                        limit: 6,
                    },
                },
                {withCredentials: true}
            )
            .then((res) => {
                console.log(res.data);
                setJobs(res.data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="container max-w-[80%] mx-auto px-5">
            <p className="text-4xl md:text-8xl text-center dark:text-white my-8">
                Latest <span className="text-emerald-400 dark:text-rose-400">Jobs</span>
            </p>
            <div>
                {jobs.length > 0 && jobs.map((job, index) => {
                    return (
                        <div key={index}
                             className="flex flex-wrap items-center container pt-4 border hover:border-emerald-500 dark:hover:border-rose-400 dark:bg-gray-800 dark:text-white rounded-md my-8 bg-white overflow-hidden hover:-translate-y-0.5 transition ease-in-out delay-300">
                            <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                                <img src='https://myrathemes.com/jobsila/images/featured-job/img-1.png' />
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
                            <div className="w-full flex justify-between items-center bg-main dark:bg-gray-900 py-4 px-6">
                                <p>Experience: {job.experience}</p>
                                <Link to={`/jobs/${job._id}`} className="flex items-center">View more
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor"
                                         className="w-4 h-4 ml-1 text-emerald-400 dark:text-rose-400">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg>

                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center my-6">
                <button
                    onClick={() => navigate('/jobs')}
                    className="dark:bg-rose-400 dark:hover:bg-rose-500 bg-emerald-400 hover:bg-emerald-600 rounded-md md:px-6 px-4 md:py-3 py-2 text-lg font-semibold text-white shadow-sm">
                    Show All Jobs
                </button>
            </div>
        </div>
    );
};

export default ShowLatestJobs;
