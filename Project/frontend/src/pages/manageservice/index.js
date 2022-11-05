import React, { useState, useEffect } from 'react'
import "./serdash.css";

const RecordNewDelivery = (props) => (

    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cuscard">
        <a href={`/manageservice/viewdel/${props.record._id}`}>
            <img className="rounded-t-lg" src="https://via.placeholder.com/300" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">{props.record.itemid}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {props.record.itemname}<br />
                {props.record.date}<br />
                {props.record.customerid}<br />
            </p>
            <a href={`/manageservice/viewdel/${props.record._id}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 vbtn">
                View Details
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>

);

const RecordNewRepairs = (props) => (

    <div
        class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cuscard">
        <a href={`/manageservice/viewrep/${props.record._id}`}>
            <img class="rounded-t-lg" src={props.record.imgurl} alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">{props.record.itemname}
                </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {props.record.repairdate}<br />
                {props.record.customerid}<br />

            </p>
            <a href={`/manageservice/viewrep/${props.record._id}`} target="_blank" rel="noreferrer"
                class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800B vbtn">
                View Details
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
);
const RecordRepairedItems = (props) => (

    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customerid}
        </th>
        <td className="py-4 px-6">
            {props.record.employeeid}
        </td>
        <td className="py-4 px-6">
            {props.record.repairdate}
        </td>
        <td className="py-4 px-6">
            {props.record.itemname}
        </td>
        <td className="py-4 px-6">
            {props.record.repaidescription}
        </td>
        <td className="py-4 px-6">
            {props.record.repairfee}
        </td>
    </tr>


);

const RecordDeliveredItems = (props) => (

    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.itemid}
        </th>
        <td className="py-4 px-6">
            {props.record.status}
        </td>
        <td className="py-4 px-6">
            {props.record.date}
        </td>
        <td className="py-4 px-6">
            {props.record.remarks}
        </td>
    </tr>


);
export default function ServiceManagement() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);
    const [records4, setRecords4] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delivery/new5`);

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
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/new5`);

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
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/`);

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

    useEffect(() => {
        async function getRecords4() {
            const response4 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delivery/completed`);

            if (!response4.ok) {
                const message = `An error occurred: ${response4.statusText}`;
                window.alert(message);
                return;
            }

            const records4 = await response4.json();
            setRecords4(records4);
        }
        getRecords4();
        return;
    }, [records4.length]);

    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewDelivery
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
                <RecordNewRepairs
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
                <RecordRepairedItems
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList4() {
        return records4.map((record) => {
            return (
                <RecordDeliveredItems
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div className="newRepairs">
                <div className="addbtn">
                    <a href="/manageservice/addDelivery" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Deliveries</button>
                    </a>
                    <a href="/manageservice/addRepair" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Repairs</button>
                    </a>

                </div>
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Deliveries.!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    {recordList()}
                </div >
                <br />
                <div className="supRibbon"></div>
                <div className="row btnrow">
                    <a href="/manageservice/viewalldel" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Deliveries</button></a>
                </div>
            </div>
            <br />
            <div className="newRepairs">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Repairs.!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    {recordList2()}
                </div >

                <div className="supRibbon"></div>
                <div className="row btnrow">
                    <a href="/manageservice/viewallrep" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Repairs</button></a>

                </div>
            </div>

            <div className="repairedItems"><div className="row">

                <div className="overflow-x-auto relative">
                    <div className="row">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Repaired Items!!</h1>
                            </span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Customer ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Item ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Date
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Item Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Description
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Repair Price
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {recordList3()}
                        </tbody>
                    </table>
                </div>

            </div>
            </div>

            <div className="repairedItems"><div className="row">

                <div className="overflow-x-auto relative">
                    <div className="row">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Delivered Items!!</h1>
                            </span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Item ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Date
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Remarks
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {recordList4()}
                        </tbody>
                    </table>
                </div>

            </div>
            </div>




        </div>



    )

}