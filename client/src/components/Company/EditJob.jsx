import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Button from "../Button.jsx";

const EditJob = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [experience, setExperience] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState("");
    const [validation, setValidation] = useState({});

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/company/jobs/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setTitle(res.data.title);
                setCategory(res.data.category);
                setExperience(res.data.experience);
                setEmploymentType(res.data.employmentType);
                setLocation(res.data.location);
                setDescription(res.data.description);
                setSalary(res.data.salary);
            })
    }, []);
    const updateJob = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/company/jobs/${id}`, {
            title,
            category,
            experience,
            employmentType,
            description,
            salary
        }, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                navigate(`/dashboard/jobs/${id}`);
            })
            .catch(err => {
                console.log(err);
                setValidation(err.response.data.errors);
            })
    }

    return (
        <>
            <div className="min-h-[calc(100vh-64px)] p-8">
                <form
                    onSubmit={updateJob}
                    className="lg:w-1/2 w-full mx-auto p-12 shadow-box rounded-md dark:bg-gray-800"
                >
                    <h2 className="center text-4xl font-bold dark:text-white text-center">
                        Update Job
                    </h2>
                    <div className="relative z-0 w-full my-6 group">
                        <input
                            value={title}
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
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm dark:text-white text-gray-500 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                            id="category"
                        >
                            <option value="" disabled="disabled" defaultValue>
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
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 dark:text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                            id="experience"
                        >
                            <option disabled="disabled" defaultValue value="">
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
                    <div className="relative z-0 w-full my-6 group">
                        <select
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm dark:text-white text-gray-500 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                            id="employment-type"
                        >
                            <option disabled="disabled" defaultValue value="">
                                Employment Type
                            </option>
                            <option className="text-neutral-950" value="Part time">
                                Part time
                            </option>
                            <option className="text-neutral-950" value="Full time">
                                Full time
                            </option>
                            <option className="text-neutral-950" value="Freelancer">
                                Freelancer
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
                    <div className="relative w-full my-6 z-10">
                        <div className="group">
                            <input
                                disabled={true}
                                type="text"
                                id="location"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none dark:text-white dark:border-emerald-400 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
                                placeholder=" "
                                value={location}
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

                    </div>
                    <div className="relative z-0 w-full my-6 group">
                        <input
                            value={salary}
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
          <textarea
              value={description}
              id="description"
              rows="4"
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
                    <Button value="Update Job" type="submit" />
                </form>
            </div>
        </>
    )
}

export default EditJob;