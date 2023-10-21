import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import moment from "moment";
import ApplicationModal from "./ApplicationModal.jsx";

const JobDetailsContent = (props) => {
    const {job, socket} = props;

    return (
        <>
            <div className="flex justify-between">
                <p className="text-4xl capitalize">{job.title}</p>
                <button onClick={props.onClick}>{props.value}</button>
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
            <ApplicationModal socket={socket} job={job}  />
        </>
    );
};

export default JobDetailsContent;
