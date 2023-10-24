import {useState, useEffect, useRef} from "react";
import "./App.css";
import io from 'socket.io-client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./views/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import JobForm from "./components/Company/JobForm.jsx";
import JobsList from "./components/JobsList";
import JobDetails from "./components/JobDetails";
import ScrollToTop from "./components/ScrollToTop.jsx";
import UpdateProfile from "./components/Company/UpdateProfile.jsx";
import ChangePassword from "./components/Company/ChangePassword.jsx";
import PublicLayout from "./views/PublicLayout.jsx";
import CompanyJobs from "./components/Company/CompanyJobs.jsx";
import ProtectedLayout from "./views/ProtectedLayout.jsx";
import Dashboard from "./components/Company/Dashboard.jsx";
import JobApplications from "./components/Company/JobApplications.jsx"
import EditJob from "./components/Company/EditJob.jsx";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ApplicationDetails from "./components/Company/ApplicationDetails.jsx";

function App() {
    const ref = useRef(null);
    const socket = io('http://127.0.0.1:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "1" ? 1 : 0
    );

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    useEffect(() => {
        if (darkMode) {
            localStorage.setItem("darkMode", "1");
        } else {
            localStorage.removeItem("darkMode");
        }
    }, [darkMode]);

    return (
        <div className={(darkMode ? "dark" : "") + " overflow-y-auto h-screen"} ref={ref}>
            <div className="bg-main dark:bg-gray-900 min-h-full py-4">
                <BrowserRouter>
                    <ToastContainer
                        position="top-center"
                        autoClose={500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <Routes>
                        <Route exact path="/"
                               element={
                                   <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <Main />
                                   </PublicLayout>
                               }>
                        </Route>
                        <Route exact path="/register"
                               element={
                                   <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <Register />
                                   </PublicLayout>
                               }>
                        </Route>
                        <Route exact path="/login"
                               element={
                                   <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <Login />
                                   </PublicLayout>
                               }>
                        </Route>

                        <Route exact path="/jobs"
                               element={
                                   <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobsList socket={socket} />
                                   </PublicLayout>
                               }>
                        </Route>
                        <Route exact path="/jobs/:id"
                               element={
                                   <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobDetails socket={socket} />
                                   </PublicLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <Dashboard />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/profile"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <UpdateProfile />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/profile/change-password"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <ChangePassword />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <CompanyJobs />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/create"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobForm />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/:id"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobApplications />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/:id/edit"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <EditJob />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/:id/applications/:applicationId"
                               element={
                                   <ProtectedLayout socket={socket} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <ApplicationDetails />
                                   </ProtectedLayout>
                               }>
                        </Route>
                    </Routes>
                    <ScrollToTop scrollRef={ref} />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
