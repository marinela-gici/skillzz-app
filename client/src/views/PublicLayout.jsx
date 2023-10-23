import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import {useNavigate, useMatch} from "react-router-dom";
import axios from "axios";

const PublicLayout = (props) => {
    const [company, setCompany] = useState(null);
    const {darkMode, toggleDarkMode, children} = props;

    const navigate = useNavigate();
    const matchRegister = useMatch('/register');
    const matchLogin = useMatch('/login');

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/dashboard/profile', {withCredentials: true})
            .then(res => {

                if (matchRegister || matchLogin) {
                    navigate('/dashboard');
                }

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