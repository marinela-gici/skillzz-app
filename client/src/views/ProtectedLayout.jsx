import React from "react";
import Sidebar from "../components/Company/Sidebar.jsx";

const ProtectedLayout = (props) => {
    const {darkMode, toggleDarkMode, children} = props;
    return (
        <>
            <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                {children}
            </Sidebar>
        </>
    )
}

export default ProtectedLayout;