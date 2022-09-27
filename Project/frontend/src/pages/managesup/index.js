/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./index.css";

const RecordNewSup = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cuscard">
        <a href="#">
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">Fname + Lname
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Address<br />
                Contact Number<br />
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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/supplier/`);

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
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/`);

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
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pre_order/`);

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


    return (
        <div>
            <h1>Manage Supplier</h1>
        </div>
    )
}