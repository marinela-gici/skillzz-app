import React from "react";
import Navbar from "../components/Navbar.jsx";

const PublicLayout = (props) => {
    const {darkMode, toggleDarkMode, children} = props;
    return (
        <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            {children}
        </>
    )
}

export default PublicLayout;