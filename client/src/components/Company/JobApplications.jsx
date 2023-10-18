import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment.js";

const JobApplications = () => {
    const [job, setJob] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/company/jobs/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setJob(res.data)
            })

            .catch(err => console.log(err))
    }, []);

    const deleteJob = (id) => {
        axios
            .delete(`http://localhost:8000/api/company/jobs/${id}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard/jobs')
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {job._id &&
                <div>
                    {/*job details*/}
                    <div className="p-8">
                        <div className="w-full mx-auto p-8 shadow-box rounded-md dark:dark:bg-gray-800 dark:text-white">
                            <div className='block md:flex md:justify-between md:items-center'>
                                <Link className='flex items-center hover:underline mb-4' to={'/dashboard/jobs'}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor"
                                         className="w-4 h-4 mr-2">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>

                                    Back to jobs</Link>
                                <div>
                                    <button onClick={() => deleteJob(job._id)}
                                            className="mr-3 my-3 md:my-0 bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke-width="1.5"
                                             stroke="currentColor"
                                             className="w-4 h-4 me-2">
                                            <path stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                        Delete job
                                    </button>

                                    <Link to={`/dashboard/jobs/${id}/edit`}
                                          className="bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke-width="1.5"
                                             stroke="currentColor"
                                             className="w-4 h-4 me-2">
                                            <path stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Edit job
                                    </Link>

                                </div>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-4xl capitalize py-2">{job.title}</p>
                            </div>

                            <Link className="text-emerald-400 dark:text-rose-400">
                                {job.category}
                            </Link>
                            <p className="capitalize text-gray-400 my-3">
                                {moment(job.createdAt).fromNow()}
                            </p>
                            <div className="flex items-center">
                                <svg
                                    className="w-4 h-4 me-2 text-emerald-400 dark:text-rose-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                >
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                <p className="capitalize">{job.location}</p>
                            </div>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <p className="capitalize">{job.description}</p>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 me-1 text-emerald-400 dark:text-rose-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        viewBox="0 0 18 18"
                                        fill="currentColor"
                                    >
                                        <path d="M13.688.311L8.666 0 0 8.665 5.334 14 14 5.332 13.688.311zm-2.354 1.528a.827.827 0 11-.002 1.654.827.827 0 01.002-1.654zM6.441 9.892c-.384-.016-.761-.168-1.128-.455l-.73.729-.579-.578.73-.729a3.612 3.612 0 01-.498-.872 3.186 3.186 0 01-.223-.934l.965-.331c.018.339.094.672.229 1.002.133.325.297.586.488.777.164.164.32.264.473.295s.287-.009.4-.123a.422.422 0 00.131-.315c-.004-.123-.035-.249-.094-.381s-.146-.308-.27-.52a6.892 6.892 0 01-.39-.793 1.501 1.501 0 01-.086-.7c.028-.248.157-.486.383-.714.275-.273.596-.408.971-.402.369.008.74.149 1.109.423l.682-.682.578.577-.676.677c.176.224.326.461.446.707.121.25.205.495.252.734l-.965.354a3.638 3.638 0 00-.314-.84 2.369 2.369 0 00-.419-.616.863.863 0 00-.404-.253.344.344 0 00-.342.1.438.438 0 00-.109.458c.049.18.162.427.332.739.172.31.299.582.383.807.086.226.113.465.084.714-.03.252-.161.493-.393.723-.295.297-.635.436-1.016.422z"></path>
                                    </svg>
                                    <p className="capitalize">${job.salary}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*job applications*/}
                    <div className='p-8'>
                        <div className="p-8 relative overflow-x-auto shadow-box sm:rounded-lg">
                            <p className="dark:text-white pb-4">Applicants
                                for <span className="text-emerald-400 dark:text-rose-500">{job.title}</span> position
                            </p>
                            {job.applications.length === 0 &&
                                <p className="text-xl text-red-600 font-bold">No applications yet!</p>}
                            {job.applications.length > 0 && job.applications.map((application, index) => {
                                return (

                                    <table key={index}
                                           className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                First name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                last name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                message
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                {job.title}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {application.firstName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {application.lastName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {application.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {application.message}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#"
                                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default JobApplications;