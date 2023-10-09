import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./views/Main";

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
      <div className="main-bg-color dark:bg-slate-800">
        <BrowserRouter>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route
              exact
              path="/"
              element={
               <Main />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
