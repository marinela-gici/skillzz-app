import React, {useEffect, useState} from "react";
import Sidebar from "../components/Company/Sidebar.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

const ProtectedLayout = (props) => {
    const [company, setCompany] = useState(null);
    const {darkMode, toggleDarkMode, children} = props;
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