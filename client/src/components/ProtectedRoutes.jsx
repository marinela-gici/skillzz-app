import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoutes = ({user, children}) => {
    console.log('ajsjas')
    if (!user) {
        return <Navigate to="/" replace />
    }

    return children;
};

export default ProtectedRoutes;