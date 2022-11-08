/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./hr.css";
import { Link } from "react-router-dom";

const RecordNewEmp = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 cuscard">
        <a href="#">
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.fname} {props.record.lname}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-700">
                {props.record.email}<br />
                {props.record.contactno}<br />
            </p>
            <a href={`/viewemployee/${props.record._id}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View Profile
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
);

const RecordTopEmp = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.fname} {props.record.lname}
        </th>
        <td className="py-4 px-6">
            {props.record.email}
        </td>
        <td className="py-4 px-6">
            {props.record.contact}
        </td>
        <td className="py-4 px-6">
            {props.record.totalservices}
        </td>
    </tr>
);

const RecordPosition = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scopeName="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.position}
        </th>
        <td className="py-4 px-6">
            {props.record.basicSalary}
        </td>
        <td className="py-4 px-6">
            {props.record.allowances}
        </td>
        <td className="py-4 px-6">
            {props.record.epf}
        </td>
        <td className="py-4 px-6">
            {props.record.etf}
        </td>
        <td className="py-4 px-6">
            {props.record.bonus}
        </td>
        <td className="py-4 px-6">
            {props.record.deductions}
        </td>
        <td class="py-4 px-6">
            <Link className="btn btn-link" to={`/UpdatePosition/${props.record._id}`}><span className="text-red-800"> Edit - </span></Link>
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }}><span className="text-red-800"> Delete</span></button>
        </td>
    </tr>
)

export default function EmpManagement() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee/new5`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    useEffect(() => {
        async function getRecords2() {
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee/top5`);

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

    useEffect(() => {
        async function getRecords3() {
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/position`);

            if (!response3.ok) {
                const message = `An error occurred: ${response3.statusText}`;
                window.alert(message);
                return;
            }

            const records3 = await response3.json();
            setRecords3(records3);
        }

        getRecords3();

        return;
    }, [records3.length]);

    // This method will delete a record
    // async function deleteRecord(id) {
    //     await fetch(`http://localhost:5000/${id}`, {
    //         method: "DELETE"
    //     });

    //     const newRecords = records.filter((el) => el._id !== id);
    //     setRecords(newRecords);
    // }

    async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/position/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords3(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewEmp
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordTopEmp
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList3() {
        return records3.map((record) => {
            return (
                <RecordPosition
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div className="newCustomers">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Employees!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    {recordList()}
                </div >

                <div className="ribbon"></div>
                <div className="row btnrow">
                    <a href="/viewallemp" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Employees</button></a>
                </div>
            </div>
            <br />

            <div className="topCustomers">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Top Employees!!</h1>
                        </span>
                    </div>
                </div>
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Employee Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Employee Email
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Employee Contact No
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Number of Actions
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
                <div className="row btnrow">
                    <a href="#"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Employee Activity Record</button></a>
                </div>

            </div>
            <br />

            <div className="topemp">
                <div className="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Employee Positions</h1>
                        </span>
                    </div>
                </div>
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Position
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Basic Salary
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Allowances
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        EPF
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        ETF
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Bonus
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Deductions
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList3()}

                            </tbody>
                        </table>
                    </div>

                </div>
                <br />
                <div className="row btnrow2">
                    <a href="/addposition"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 btnright">
                        Add Employee Positions</button></a>
                </div>
            </div>
            <br/>
            <br/>
            <br/>

        </div>
    )
}
