import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const PublicLayout = (props) => {
    const [company, setCompany] = useState(null);
    const {darkMode, toggleDarkMode, children} = props;

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/dashboard/profile', {withCredentials: true})
            .then(res => {
                setCompany(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <Navbar company={company} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            {children}
        </>
    )
}

export default PublicLayout;