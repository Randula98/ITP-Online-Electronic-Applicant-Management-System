/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./supplier.css";

const RecordNewSup = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 supcard">
        <a href="#">
            <img className="rounded-t-lg" src="https://via.placeholder.com/300" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">{props.record.supplierfname} {props.record.supplierlname}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {props.record.street} {props.record.city} {props.record.province}<br />
                {props.record.contactnumber}<br />
            </p>
            <a href="#"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 btnup">
                View Details
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div >
    </div >
);

const RecordOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.supplierid}
        </th>
        <td class="py-4 px-6">
            {props.record.date}
        </td>
        <td class="py-4 px-6">
            {props.record.itemid}
        </td>
        <td class="py-4 px-6">
            {props.record.quantity}
        </td>
        <td class="py-4 px-6">
            {props.record.aprrovedstatus}
        </td>
        <td class="py-4 px-6">
            {props.record.orderstatus}
        </td>
        <td class="py-4 px-6">
            {props.record.details}
        </td>

    </tr>
);

const RecordPreOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.itemid}
        </th>
        <td class="py-4 px-6">
            {props.record.supplierid}
        </td>
        <td class="py-4 px-6">
            {props.record.date}
        </td>
        <td class="py-4 px-6">
            {props.record.quantity}
        </td>

    </tr>
);

export default function SupplierManagement() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);


    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/supplier/new5`);

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
    }, [records2.length]);

    useEffect(() => {
        async function getRecords2() {
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/`);

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
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pre_order/`);

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

    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewSup
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
                <RecordOrders
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
                <RecordPreOrders
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div className="newSupplier">
                <div className="row">
                <a href="/addOrder" target="_blank">
                    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Order</button>
                    </a>

                    <a href="/addSupplier" target="_blank">
                    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Supplier</button>
                    </a>
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Suppliers!!</h1>
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
                        All Suppliers</button></a>
                </div>
            </div>

            <br />

            <div className="newSupplier"><div className="row">

                <div className="overflow-x-auto relative">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Order Details</h1>
                        </span>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Supplier ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Date
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Item ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Quantity
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Approved Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Order Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordList2()}
                        </tbody>
                    </table>
                </div>

            </div></div>
            <br />

            <div className="newSupplier"><div className="row">

                <div className="overflow-x-auto relative">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Pre-Order Details</h1>
                        </span>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Item ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Supplier ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Date
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Quantity
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {recordList3()}
                        </tbody>
                    </table>
                </div>

            </div></div>


        </div>
    )
}