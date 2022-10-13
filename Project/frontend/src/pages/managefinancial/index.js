import React, { useState, useEffect} from "react";
import "./index.css"

const RecordPendingLoans = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.employeeid}
        </th>
        <td class="py-4 px-6">
            {props.record.loandate}
        </td>
        <td class="py-4 px-6">
            {props.record.amount}
        </td>
        <td class="py-4 px-6">
            {props.record.duration}
        </td>
        <td class="py-4 px-6">
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td class="py-4 px-6">
            <a href="#"><span class="text-green-300">Approve-</span></a>
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }}><span className="text-red-800">-Decline</span></button>
        </td>
    </tr>
)

export default function FinanceDash() {

    const [records1, setRecords1] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/pendingloans`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords1(records);
        }

        getRecords();

        return;
    }, [records1.length]);


    async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records1.filter((el) => el._id !== id);
        setRecords1(newRecords);
    }

    // This method will map out the records on the table
    function recordList1() {
        return records1.map((record) => {
            return (
                <RecordPendingLoans
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <><div>
            <div class="com">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Requested Loans</h1>
                        </span>
                    </div>
                </div>
                <div class="row">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Employee ID
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Requested Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Requested Amount
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Duration
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Employee Profile
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList1()}
                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
                <br />
                <div class="row btnrow">
                    <a href="#"><button type="button"
                        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Completed Loans Report</button></a>
                </div>
            </div>
        </div>
            <div class="req">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Approved Loans</h1>
                        </span>

                    </div>
                </div>
                <div class="row">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Employee Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Option
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Amount
                                    </th>
                                    <th scope="col" class="py-3 px-6">

                                        Loan Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Due Date
                                    </th>

                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="py-4 px-6">
                                        Sliver
                                    </td>
                                    <td class="py-4 px-6">
                                        Laptop
                                    </td>
                                    <td class="py-4 px-6">
                                        $2999
                                    </td>
                                    <td class="py-4 px-6">
                                        $2999
                                    </td>

                                    <td class="py-4 px-6">
                                        <a href="#"><span class="text-red-800">Edit--</span></a>
                                        <a href="#"><span class="text-red-800">Delete</span></a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
            </div>

            <div class="req">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Completed Payments</h1>
                        </span>

                    </div>

                </div>
                <div class="row">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Position
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Basic Salary
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Allowances
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        EPF
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        ETF
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Bonus
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Deductions
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="py-4 px-6">
                                        Sliver
                                    </td>
                                    <td class="py-4 px-6">
                                        Laptop
                                    </td>
                                    <td class="py-4 px-6">
                                        $2999
                                    </td>
                                    <td class="py-4 px-6">
                                        $2999
                                    </td>
                                    <td class="py-4 px-6">
                                        $2999
                                    </td>
                                    <td class="py-4 px-6">
                                        $2999
                                    </td>
                                    <td class="py-4 px-6">
                                        <a href="#"><span class="text-red-800">Edit</span></a>
                                        <a href="#"><span class="text-red-800">-- Delete</span></a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}