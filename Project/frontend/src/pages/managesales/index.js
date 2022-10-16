import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sales.css";

const RecordNewPromos = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 supcard">
        <a href={`/viewpromo/${props.record._id}`}>
            <img className="rounded-t-lg" src="https://via.placeholder.com/450x300" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.fname} {props.record.lname}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-700">
                {props.record.startdate}<br />
                {props.record.enddate}<br />
            </p>
            {/* <a href={`/viewpromo/${props.record._id}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View Profile
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a> */}
        </div>
    </div>
);

const RecordTargets = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.startdate}
        </th>
        <td className="py-4 px-6">
            {props.record.enddate}
        </td>
        <td className="py-4 px-6">
            {props.record.noofactions}
        </td>
        <td className="py-4 px-6">
            <Link to={`/viewcompleted/${props.record.noofactions}`}><button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View</button></Link>
        </td>
        <td className="py-4 px-6">
            <Link to={`/viewcompleted/${props.record.noofactions}`}><button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View</button></Link>
        </td>

        <td class="py-4 px-6">
            <Link className="btn btn-link" to={`/updateTargets/${props.record._id}`}><button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update</button></Link>
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Red</button>
        </td>
    </tr>
);

export default function SalesManagement() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/promotion/new3`);

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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/targets`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records2 = await response.json();
            setRecords2(records2);
        }

        getRecords2();

        return;
    }, [records2.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/targets/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords2(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewPromos
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This method will map out the records on the table
    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordTargets
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div className="salesheader">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Promotions!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    {recordList()}
                </div >

                <div className="salesribbon"></div>
                <div className="row btnrow">
                    <a href="/viewallcus"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Promotions</button></a>
                </div>
                <br/>
            </div>

            <br />

            <div className="salesheader salesbody">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Active Targers!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Starting Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Ending Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Number Of Actions(Amount)
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Completed Employees
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Not Completed Employees
                                    </th>
                                    <th scope="col" className="py-3 px-6">
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
                <div className="row btnrow">
                    <a href="/addtargets"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Add New Targets</button></a>
                </div>
            </div>

            <div className="salesbody salebody">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Active Discounts!!</h1>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}