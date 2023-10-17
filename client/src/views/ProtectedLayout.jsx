import React from "react";

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