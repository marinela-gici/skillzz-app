import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import axios from 'axios';
import JobDetailsContent from "./JobDetailsContent";

const JobDetails = ({socket}) => {
    const {id} = useParams();
    const [job, setJob] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/jobs/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                setJob(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="min-h-[calc(100vh-64px)] p-8">
            <div className="md:w-1/2 w-full mx-auto p-12 shadow-box rounded-md dark:dark:bg-gray-800 dark:text-white">
                <Link className='flex items-center hover:underline mb-4' to={'/jobs'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                    </svg>

                    Back to jobs</Link>
                <JobDetailsContent socket={socket} job={job}/>
            </div>
        </div>
    );
};

export default JobDetails;
