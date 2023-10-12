import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import JobDetailsContent from "./JobDetailsContent";

const JobDetails = (props) => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/jobs/${id ?? props.jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setJob(res.data);
      })
      .catch((err) => console.log(err));
  }, [job]);

  return (
    <div className="min-h-[calc(100vh-64px)] p-8">
      <div className="md:w-1/2 w-full mx-auto p-12 shadow-box rounded-md dark:dark:bg-gray-800 dark:text-white">
       <JobDetailsContent job={job} />
      </div>
    </div>
  );
};

export default JobDetails;
