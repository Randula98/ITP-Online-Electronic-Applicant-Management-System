import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AddPosition() {

    const [form, setForm] = useState({
        position: "",
        basicSalary: "",
        allowance: "",
        epf: "",
        etf: "",
        bonus: "",
        deductions: "",

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

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/position/add`, {
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

        setForm({ position: "", basicSalary: "", allowance: "", epf: "", etf: "", bonus: "", deductions: "", });
        navigate("/managehr");
    }

    return (
        <div>
            <div className="salary">
                <section className="bg-gray-50 dark:bg-gray-400">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 form">
                        <br />
                        <br />
                        <br />
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-10 space-y-10 md:space-y-10 sm:p-8">
                                <h1
                                    className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    EMPLOYEE SALARY DETAILS
                                </h1>

                                <form onSubmit={onSubmit}>
                                    <div className="mb-6">
                                        <label for="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Position</label>
                                        <input type="text" id="position" name="position"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Position" required="" 
                                            onChange={(e) => updateForm({position: e.target.value})}/>
                                    </div>
                                    <div className="mb-6">
                                        <label for="basicsal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Basic
                                            Salary</label>
                                        <input type="text" id="basicsal" name="basicsal"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Basic Salary" required="" 
                                            onChange={(e) => updateForm({basicSalary: e.target.value})}/>
                                    </div>
                                    <div className="mb-6">
                                        <label for="allowances" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Allowances</label>
                                        <input type="text" id="allowances" name="allowances"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Allowances" required="" 
                                            onChange={(e) => updateForm({allowances: e.target.value})}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            EPF</label>
                                        <input type="text" id="epf" name="epf"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="EPF" required="" 
                                            onChange={(e) => updateForm({epf: e.target.value})}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            ETF</label>
                                        <input type="text" id="etf" name="etf"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="ETF" required="" 
                                            onChange={(e) => updateForm({etf: e.target.value})}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Bonus</label>
                                        <input type="text" id="bonus" name="bonus"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Bonus" required="" 
                                            onChange={(e) => updateForm({bonus: e.target.value})}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Deduction</label>
                                        <input type="text" id="deduction" name="deduction"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Deduction" required="" 
                                            onChange={(e) => updateForm({deductions: e.target.value})}/>
                                    </div>

                                    <button type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </form>


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}