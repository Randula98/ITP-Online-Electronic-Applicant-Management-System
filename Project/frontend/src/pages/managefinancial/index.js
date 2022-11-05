/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect} from "react";
import "./finance.css"

const RecordPendingLoans = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
            {props.record.loanpurpose}
        </td>
        <td class="py-4 px-6">
            <a href={`/viewemployee/${props.record._id}`}><button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Profile</button></a>
        </td>
        <td class="py-4 px-6">
            <button onClick={() => {
                props.updateStatus(props.record._id);
            }}><span class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Approve</span></button>
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }}><span className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Decline</span></button>
        </td>
    </tr>
)


const ApprovedLoansRecord = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
            {props.record.loanpurpose}
        </td>
        <td class="py-4 px-6">
            <a href={`/viewemployee/${props.record._id}`}><button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Profile</button></a>
        </td>
        <td class="py-4 px-6">
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }}><span className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</span></button>
        </td>
    </tr>
)

export default function FinanceDash() {

    const [records1, setRecords1] = useState([]);
    const [records2, setRecords2] = useState([]);

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

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords2() {
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/approvedloans`);

            if (!response2.ok) {
                const message = `An error occurred: ${response2.statusText}`;
                window.alert(message);
                return;
            }

            const records2 = await response2.json();
            setRecords2(records2);
        }

        getRecords2();

        return;
    }, [records2.length]);


    async function deleteRecord1(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records1.filter((el) => el._id !== id);
        setRecords1(newRecords);
    }

    async function deleteRecord2(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records2.filter((el) => el._id !== id);
        setRecords2(newRecords);
    }

    async function updateStatus(id){
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/approve/${id}`, {
            method: "POST"
        });

        window.location.href = "/managefinance"
    }

    // This method will map out the records on the table
    function recordList1() {
        return records1.map((record) => {
            return (
                <RecordPendingLoans
                    record={record}
                    deleteRecord={() => deleteRecord1(record._id)}
                    updateStatus={() => updateStatus(record._id)}
                    key={record._id}
                />
            );
        });
    }

        // This method will map out the records on the table
        function recordList2() {
            return records2.map((record) => {
                return (
                    <ApprovedLoansRecord
                        record={record}
                        deleteRecord={() => deleteRecord2(record._id)}
                        key={record._id}
                    />
                );
            });
        }

    return (
        <><div>
            <div class="salestable">
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
                                        Requested Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Requested Amount
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Duration
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Loan Purpose
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
                        Generate Pending Loans Report</button></a>
                </div>
            </div>
        </div>
            <div class="salestable">
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
                                        Requested Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Loan Amount
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Duration
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Loan Purpose
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
                                {recordList2()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                <div class="row btnrow">
                    <a href="#"><button type="button"
                        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Approved Loans Report</button></a>
                </div>
            </div>

            <div class="salestable">
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