/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./index.css";

const RecordNewCus = (props) => (
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
            <a href={`/viewcustomer/${props.record._id}`} target="_blank" rel="noreferrer"
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

const RecordTopCus = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.fname} {props.record.lname}
        </th>
        <td className="py-4 px-6">
            {props.record.email}
        </td>
        <td className="py-4 px-6">
            {props.record.contactno}
        </td>
        <td className="py-4 px-6">
            {props.record.totalpurchases}
        </td>
        <td className="py-4 px-6">
            {props.record.totalpayments}
        </td>
    </tr>
);



export default function CusManagement() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/new5`);

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
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/top5`);

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

    // This method will delete a record
    // async function deleteRecord(id) {
    //     await fetch(`http://localhost:5000/${id}`, {
    //         method: "DELETE"
    //     });

    //     const newRecords = records.filter((el) => el._id !== id);
    //     setRecords(newRecords);
    // }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewCus
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
                <RecordTopCus
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
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
                            <h1>New Customers!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    {recordList()}
                </div >

                <div className="ribbon"></div>
                <div className="row btnrow">
                    <a href="/viewallcus" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Customers</button></a>
                </div>
            </div>
            <br />

            <div className="topCustomers">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Top Customers!!</h1>
                        </span>
                    </div>
                </div>
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Customer Email
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Customer Contact No
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Number of Purchases
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Total Spent Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList2()}
                            </tbody>
                        </table>
                    </div>

                </div>
                <br/>
                <div className="row btnrow">
                    <a href="#"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Customer Activity Record</button></a>
                </div>

            </div>

            <br />
            {/* <div className="topCustomers">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Least Interacted Customers For The Past 3 Months!!</h1>
                        </span>
                    </div>
                </div> 
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Customer Email
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Customer Contact No
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Number of Purchases
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Total Spent Amount
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="py-4 px-6">
                                        Sliver
                                    </td>
                                    <td className="py-4 px-6">
                                        Laptop
                                    </td>
                                    <td className="py-4 px-6">
                                        $2999
                                    </td>
                                    <td className="py-4 px-6">
                                        $2999
                                    </td>
                                    <td className="py-4 px-6">
                                        <a href="#"><span className="text-red-800">Delete</span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div> 

            </div>*/}
        </div>
    )
}