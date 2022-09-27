import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePosition() {

    const [form, setForm] = useState({
        position: "",
        basicSalary: "",
        allowances: "",
        epf: "",
        etf: "",
        bonus: "",
        deductions: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/position/position/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/managehr");
                return;
            }

            setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    //These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {
                ...prev, ...value,
            };
        });
    }

    async function onsubmit(e) {
        e.preventDefault();
        const editedPerson = {
            position: form.position,
            basicSalary: form.basicSalary,
            allowances: form.allowances,
            epf: form.epf,
            etf: form.etf,
            bonus: form.bonus,
            deductions: form.deductions,
        };

        //This will send a post request to update the data in the database.
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/position/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                "Content-Type": "application/json"
            },
        });
        navigate("/managehr");
    }
    return (
        <div>
            <div classNameName="salary salUpdate">
                <br/>   
                <section className="bg-gray-50 dark:bg-gray-400">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1
                                    className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    EMPLOYEE SALARY UPDATE</h1>

                                <form onSubmit={onsubmit}>
                                    <div className="mb-6">
                                        <label for="position"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Position</label>
                                        <input type="text" id="position" name="position"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required="" 
                                            value={form.position}
                                            onChange={(e) => updateForm({ position: e.target.value })} />
                                    </div>
                                    <div className="mb-6">
                                        <label for="basicsal"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Basic
                                            Salary</label>
                                        <input type="text" id="basicsal" name="basicsal"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="" 
                                            value={form.basicSalary}
                                            onChange={(e) => updateForm({ position: e.target.value })}/>
                                    </div>
                                    <div className="mb-6">
                                        <label for="allowances"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Allowances</label>
                                        <input type="text" id="allowances" name="allowances"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="" 
                                            value={form.allowances}
                                            onChange={(e) => updateForm({ position: e.target.value })}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            EPF</label>
                                        <input type="text" id="epf" name="epf"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="" 
                                            value={form.epf}
                                            onChange={(e) => updateForm({ position: e.target.value })}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            ETF</label>
                                        <input type="text" id="etf" name="etf"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="" 
                                            value={form.epf}
                                            onChange={(e) => updateForm({ position: e.target.value })}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Bonus</label>
                                        <input type="text" id="bonus" name="bonus"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="" 
                                            value={form.bonus}
                                            onChange={(e) => updateForm({ position: e.target.value })}/>
                                    </div>

                                    <div className="mb-6">
                                        <label for="epf"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Deduction</label>
                                        <input type="text" id="deduction" name="deduction"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required="" 
                                            value={form.deductions}
                                            onChange={(e) => updateForm({ position: e.target.value })}/>
                                    </div>

                                    <button type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}