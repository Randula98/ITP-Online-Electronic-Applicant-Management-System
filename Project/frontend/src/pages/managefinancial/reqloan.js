/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function ReqLoan() {

    const Emergency = "Emergency Loan";
    const Home = "Home Loan";
    const Medical = "Medical Loan";
    const Vehicle = "Vehicle Loan";
    const Education = "Education Loan";
    const Personal = "Personal Loan";
    const Wedding = "Wedding Loan";

    const [form, setForm] = useState({
        loandate: "",
        duedate: "",
        amount: "",
        duration: "",
        loanpurpose: "",
        employeeid: localStorage.getItem("empID"),
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({
            loandate: "",
            duedate: "",
            amount: "",
            duration: "",
            loanpurpose: "",
            employeeid: "",
        });
        alert("Loan Requested Successfully");
        navigate("/empdash");
    }
    return (
        <div>
            <div class="loan">
                <section class="bg-gray-50 dark:bg-gray-300">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div
                            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1
                                    class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    LOAN APPLICATION FORM
                                </h1>
                                <form class="space-y-4 md:space-y-6" onSubmit={onSubmit}>

                                    <div>
                                        <label for="loan_purpose"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                Enter Loan Purpose
                                            </label>
                                        <select id="loan_purpose"
                                            onChange={(e) => updateForm({ loanpurpose: e.target.value })}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected="">Choose a loan purpose</option>
                                            <option value={Emergency} >{Emergency}</option>
                                            <option value={Home}>{Home}</option>
                                            <option value={Medical}>{Medical}</option>
                                            <option value={Education}>{Education}</option>
                                            <option value={Personal}>{Personal}</option>
                                            <option value={Vehicle}>{Vehicle}</option>
                                            <option value={Wedding}>{Wedding}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="amount"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount
                                        </label>
                                        <input type="text" name="text" id="amount"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Rs 1000000.00"
                                            onChange={(e) => updateForm({ amount: e.target.value })}
                                            required />
                                    </div>

                                    <div>
                                        <label for="amount"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loan Duration (in months)
                                        </label>
                                        <input type="text" name="text" id="amount"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="60"
                                            onChange={(e) => updateForm({ duration: e.target.value })}
                                            required />
                                    </div>

                                    <button type="Submit"
                                        class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Request Loan
                                    </button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        <a href="#"
                                            class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        </a>
                                    </p>
                                </form>

                            </div>

                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}