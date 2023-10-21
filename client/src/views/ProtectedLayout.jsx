import React, {useEffect, useState} from "react";
import Sidebar from "../components/Company/Sidebar.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const ProtectedLayout = (props) => {
    const [company, setCompany] = useState(null);
    const {darkMode, toggleDarkMode, children, socket} = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/dashboard/profile', {withCredentials: true})
            .then(res => {
                setCompany(res.data);
            })
            .catch(err => {
                console.log(err);
                navigate("/login");
            })
    }, []);

    const viewApplication = (jobId, applicationId) => {
        return (
            <div>
                <Link to={`/dashboard/jobs/${jobId}/applications/${applicationId}`}
                      className="flex items-center my-3 md:my-0">
                    View application
                </Link>
            </div>
        );
    }

    useEffect(() => {
        socket.on("toClient", (application) => {
            axios
                .get(`http://localhost:8000/api/company/jobs/${application.job}/applications/${application._id}`, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    toast.success(viewApplication(application.job, application._id), {
                            autoClose: 10000,
                    })
                    // toast.success('You have a new application!', {
                    //     position: "top-center",
                    //     autoClose: 5000,
                    //     hideProgressBar: true,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: false,
                    //     theme: "colored",
                    // });

                    return () => socket.off("toClient");
                })
                .catch(err => console.log(err));
        });
    }, [socket]);

    return (
        <>
            {company &&
                <Sidebar company={company} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                    {children}
                </Sidebar>
            }
        </>
    )
}

export default ProtectedLayout;