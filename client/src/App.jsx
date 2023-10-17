import {useState, useEffect} from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import JobForm from "./components/JobForm";
import JobsList from "./components/JobsList";
import JobDetails from "./components/JobDetails";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProfilePage from "./components/Company/ProfilePage.jsx";
import ChangePassword from "./components/Company/ChangePassword.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import PublicLayout from "./views/PublicLayout.jsx";
import SideNavbar from "./components/Company/SideNavbar.jsx";
import Sidebar from "./components/Company/Sidebar.jsx";
import CompanyJobs from "./components/Company/CompanyJobs.jsx";

function App() {
    const [user, setUser] = useState(null);
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
            <div className="bg-main dark:bg-gray-900 py-4">
                <BrowserRouter>
                    {/*<Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />*/}
                    <Routes>
                        <Route exact path="/" element={
                            <PublicLayout>
                                <Main />
                            </PublicLayout>
                        }></Route>
                        <Route exact path="/register" element={
                            <PublicLayout>
                                <Register />
                            </PublicLayout>
                        }></Route>
                        <Route exact path="/login" element={
                            <PublicLayout>
                                <Login />
                            </PublicLayout>
                        }></Route>

                        <Route exact path="/jobs/create" element={
                            <PublicLayout>
                                <JobForm />
                            </PublicLayout>
                        }></Route>

                        <Route exact path="/jobs" element={
                            <PublicLayout>
                                <JobsList />
                            </PublicLayout>
                        }></Route>
                        <Route exact path="/jobs/:id" element={
                            <PublicLayout>
                                <JobDetails />
                            </PublicLayout>
                        }></Route>

                        <Route exact path="/dashboard" element={<CompanyJobs darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}></Route>
                        <Route exact path="/dashboard/profile" element={<ProfilePage />}></Route>
                        <Route exact path="/dashboard/profile/change-password" element={<ChangePassword />}></Route>
                        <Route
                            path='/dashboard1'
                            element={
                                <ProtectedRoutes user={user}>
                                    {/*<ProtectedLayout>ProtectedLayout*/}
                                    {/*  <Jobs />*/}
                                    {/*</ProtectedLayout>*/}
                                </ProtectedRoutes>
                            }
                        ></Route>
                    </Routes>
                    <ScrollToTop />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
