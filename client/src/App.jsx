import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import JobForm from "./components/JobForm";
import JobsList from "./components/JobsList";
import JobDetails from "./components/JobDetails";

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

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-main dark:bg-gray-900">
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/jobs/create" element={<JobForm />}></Route>
            <Route exact path="/jobs" element={<JobsList />}></Route>
            <Route exact path="/jobs/:id" element={<JobDetails />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
