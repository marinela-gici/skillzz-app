import {useState, useEffect} from "react";
import "./App.css";
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
import axios from "axios";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
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

    const onScroll = (e) => {
        const {offsetHeight, scrollTop, scrollHeight} = e.target;

        if (offsetHeight + scrollTop + 20 >= scrollHeight) {
            const shouldUpdateEvent = new CustomEvent("shouldUpdateList", {});
            document.dispatchEvent(shouldUpdateEvent);
        }
    }

    return (
        <div className={(darkMode ? "dark" : "") + " overflow-y-auto h-screen"} onScroll={onScroll}>
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
            <div className="bg-main dark:bg-gray-900 min-h-full py-4">
                <BrowserRouter>
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
                                       <JobsList />
                                   </PublicLayout>
                               }>
                        </Route>
                        <Route exact path="/jobs/:id"
                               element={
                                   <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobDetails />
                                   </PublicLayout>
                               }>
                        </Route>

                        {/*<Route exact path="/verifyemail/:verificationCode"*/}
                        {/*       element={*/}
                        {/*           <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>*/}
                        {/*               <JobDetails />*/}
                        {/*           </PublicLayout>*/}
                        {/*       }>*/}
                        {/*</Route>*/}

                        <Route exact path="/dashboard"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <Dashboard />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/profile"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <UpdateProfile />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/profile/change-password"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <ChangePassword />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <CompanyJobs />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/create"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobForm />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/:id"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <JobApplications />
                                   </ProtectedLayout>
                               }>
                        </Route>
                        <Route exact path="/dashboard/jobs/:id/edit"
                               element={
                                   <ProtectedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                                       <EditJob />
                                   </ProtectedLayout>
                               }>
                        </Route>

                        {/*/!*<Route exact path="/dashboard/profile" element={<UpdateProfile />}></Route>*!/*/}
                        {/*<Route exact path="/dashboard/profile/change-password" element={<ChangePassword />}></Route>*/}
                        {/*<Route exact path="/dashboard/jobs" element={<CompanyJobs />}></Route>*/}
                        {/*<Route exact path="/dashboard/jobs/create" element={<JobForm />}></Route>*/}
                        {/*<Route*/}
                        {/*    path='/dashboard1'*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoutes user={user}>*/}
                        {/*            /!*<ProtectedLayout>ProtectedLayout*!/*/}
                        {/*            /!*  <Jobs />*!/*/}
                        {/*            /!*</ProtectedLayout>*!/*/}
                        {/*        </ProtectedRoutes>*/}
                        {/*    }*/}
                        {/*></Route>*/}
                    </Routes>
                    <ScrollToTop />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
