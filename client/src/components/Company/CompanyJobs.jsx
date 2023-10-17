import React from "react";
const CompanyJobs = () => {
    return (
        <div
            className="flex flex-wrap items-center container pt-4 border hover:border-emerald-500 dark:hover:border-rose-400 dark:bg-gray-800 dark:text-white rounded-md my-8 bg-white">
            <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                <img src='https://myrathemes.com/jobsila/images/featured-job/img-1.png' />
            </div>

            <div className="w-full flex flex-col justify-center items-center md:w-1/5 mb-4">
                <p>Job titele</p>
                <p className="text-gray-500 dark:text-gray-400">job.category</p>
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

                job.location
            </div>
            <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                $job.salary
            </div>
            <div className="w-full flex justify-center items-center md:w-1/5 mb-4">
                job.employmentType
            </div>
            <div className="w-full flex justify-between items-center bg-main dark:bg-gray-900 py-4 px-6">
                <p>Experience: job.experience</p>
                <div>
                    {/*<Link to={`/jobs/${job._id}`} className="flex items-center">View more*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg"*/}
                    {/*         fill="none"*/}
                    {/*         viewBox="0 0 24 24"*/}
                    {/*         strokeWidth="1.5"*/}
                    {/*         stroke="currentColor"*/}
                    {/*         className="w-4 h-4 ml-1 text-emerald-400 dark:text-rose-400">*/}
                    {/*        <path strokeLinecap="round"*/}
                    {/*              strokeLinejoin="round"*/}
                    {/*              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />*/}
                    {/*    </svg>*/}

                    {/*</Link>*/}
                    <button className="bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
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
                </div>

            </div>
        </div>
    )
}

export default CompanyJobs;