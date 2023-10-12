import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";

const JobForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [searchLocations, setSearchLocations] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const createJob = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/jobs", {
        title,
        category,
        experience,
        location,
        description,
        salary,
      })
      .then((res) => {
        console.log(res);
        navigate("/jobs");
      })
      .catch((err) => {
        console.log(err);
        setValidation(err.response.data.errors);
      });
  };

  const getLocation = (e) => {
    setLocation(e.target.value);

    if (location) {
      axios
        .get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&lang=en&limit=10&type=country&format=json&apiKey=3a93fd6a6e544c119dccea860dbd08bc`
          // `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&format=json&apiKey=3a93fd6a6e544c119dccea860dbd08bc`
        )
        .then((response) => {
          console.log(response.data);
          setSearchLocations(response.data.results);
        })
        .catch((err) => console.log(err));
    } else {
      setSearchLocations([]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-8">
      <form
        onSubmit={createJob}
        className="md:w-1/3 sm:w-1/2 w-full mx-auto p-12 shadow-box rounded-md dark:bg-gray-800"
      >
        <h2 className="center text-4xl font-bold dark:text-white text-center">
          Create a Job
        </h2>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="text"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Job Title
          </label>
          {validation.title ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.title.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-gray-500 dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            id="category"
          >
            <option value="" selected={true} disabled="disabled" defaultValue>
              Category
            </option>
            <option className="text-neutral-950" value="Website and Software">
              Website and Software
            </option>
            <option className="text-neutral-950" value="Education and Training">
              Education and Training
            </option>
            <option className="text-neutral-950" value="Graphic & UI/UX Design">
              Graphic & UI/UX Design
            </option>
            <option className="text-neutral-950" value="Accounting and Finance">
              Accounting and Finance
            </option>
            <option className="text-neutral-950" value="Restaurant & Food">
              Restaurant & Food
            </option>
            <option className="text-neutral-950" value="Health & Hospital">
              Health & Hospital
            </option>
          </select>

          {validation.category ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.category.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <select
            onChange={(e) => setExperience(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-gray-500 dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            id="experience"
          >
            <option disabled="disabled" selected={true} defaultValue value="">
              Experience
            </option>
            <option className="text-neutral-950" value="Entry Level">
              Entry Level
            </option>
            <option className="text-neutral-950" value="Intermediate">
              Intermediate
            </option>
            <option className="text-neutral-950" value="Expert">
              Expert
            </option>
          </select>

          {validation.experience ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.experience.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 z-10">
          <div className="group">
            <input
              type="text"
              id="location"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              value={location}
              onInput={getLocation}
              onFocus={() => setShowSearchBar(true)}
              onBlur={() => setShowSearchBar(false)}
            />
            <label
              htmlFor="location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Location
            </label>
            {validation.location ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.location.message}
              </p>
            ) : (
              ""
            )}
          </div>
          {showSearchBar && (
            <div
              id="search-results"
              className="absolute w-full dark:bg-gray-800 bg-main text-slate-800 dark:text-white"
            >
              {searchLocations.length > 0 &&
                searchLocations.map((searchLocation, index) => {
                  return (
                    <p key={index} onMouseDown={(e) => {
                        e.preventDefault(); 
                        setLocation(searchLocation.address_line1);
                        setShowSearchBar(false);
                      }
                      } className="cursor-pointer dark:hover:bg-emerald-800 hover:text-white hover:bg-emerald-800 bg-slate-200 dark:bg-slate-700 w-full pl-3 py-3 rounded-md my-3">
                      {searchLocation.address_line1}
                    </p>
                  );
                })}

                {searchLocations.length === 0 && <p className="pl-3 py-3 rounded-md my-3">No results found.</p>}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="number"
            id="salary"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setSalary(e.target.value)}
          />
          <label
            htmlFor="salary"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Salary
          </label>
          {validation.salary ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.salary.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full my-6 group">
          <input
            type="text"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            onChange={(e) => setDescription(e.target.value)}
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Job Description
          </label>
          {validation.description ? (
            <p className="text-sm text-red-600 font-bold">
              {validation.description.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <Button value="Create Job" type="submit" />
        <p className="my-6 dark:text-white">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 font-bold">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default JobForm;
