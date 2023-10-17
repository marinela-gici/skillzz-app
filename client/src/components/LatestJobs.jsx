import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

const LatestJobs = () => {
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
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
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
    <div className="container mx-auto px-5">
      <p className="text-4xl md:text-8xl text-center dark:text-white my-8">
        Latest <span className="dark:text-emerald-400 text-rose-400">Dashboard</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {jobs.length > 0 &&
          jobs.map((job, index) => {
            return (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={`/jobs/${job._id}`}>
                  <h5 className="capitalize mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.title}
                  </h5>
                </Link>
                <p className="capitalize mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {job.location}
                </p>
                <p className="capitalize mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {getShortDescription(job.description)}
                </p>
                <div className="text-gray-400 dark:text-white my-3">
                  Posted {moment(job.createdAt).fromNow()}
                </div>
                <Button
                  value="Read More"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-center my-6">
        <Button
          value="Show All Dashboard"
          type="button"
          onClick={() => navigate("/jobs")}
        />
      </div>
    </div>
  );
};

export default LatestJobs;
