import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import JobDetailsContent from "./JobDetailsContent";
import Button from "./Button";
import moment from "moment";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);

  //   const [isLoading, setIsLoading] = useState(false);
  //   const [offset, setOffset] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/jobs")
      .then((res) => {
        console.log(res);
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getShortDescription = (description) => {
    if (description.length > 50) {
      description = description.substring(0, 70) + "...";
    }
    return description;
  };

  return (
    <div className="conntainer mx-auto p-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/5 p-5">
          {jobs.length > 0 &&
            jobs.map((job, index) => {
              return (
                <div
                  onClick={() => setActiveJob((prevJob) => job)}
                  key={index}
                  className={(activeJob && activeJob._id === job._id ? "border-emerald-400 dark:border-rose-400" : 'border-gray-200 dark:border-gray-700') + " p-6 mb-4 bg-white border rounded-lg shadow dark:bg-gray-800"}
                >
                  <div>
                    <h5 className="capitalize mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {job.title}
                    </h5>
                  </div>
                  <p className="capitalize mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {job.location}
                  </p>
                  <p className="capitalize mb-3 font-normal text-gray-700 dark:text-gray-400 dark:text-white">
                    {getShortDescription(job.description)}
                  </p>
                  <div className="text-gray-400 my-3">
                    Posted {moment(job.createdAt).fromNow()}
                  </div>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="text-emerald-400 dark:text-rose-400"
                  >
                    Read More
                  </Link>
                </div>
              );
            })}
        </div>
        {activeJob && (
          <div className="hidden md:block md:w-3/5 p-5">
            <div className="sticky top-2.5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <JobDetailsContent
                onClick={() => setActiveJob(null)}
                value={
                  <svg
                    class="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                }
                job={activeJob}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
