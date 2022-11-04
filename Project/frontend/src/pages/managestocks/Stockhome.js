/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from 'react-to-print';
import "./Stockh.css";

import { LowStockPrint } from "./lowstockprint";

const RecordAllBrands = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandhcard">
        <div className="brandhcardimg">
            <a href="#">
                <img className="rounded-t-lg" src={props.record.brandurl} alt="" />
            </a>
        </div>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.bname}
                </h5>
            </a>

            {/* <button type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            props.deleteRecord(props.record._id);
        }}
        >
          Delete</button> */}

        </div>
    </div>
);

const RecordNewItem = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 itemcard">
        <a href={`/itemviewone/${props.record._id}`}>
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
        </a>
        <div class="p-5">
        <a href={`/itemviewone/${props.record._id}`}>
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {props.record.brand}<br />
                {props.record.itemname}<br />
                Rs. {props.record.unitprice}<br />
            </p>
            <a href={`/itemviewone/${props.record._id}`}
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View Item
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

export default function Stockhome() {
    const componentRef = useRef();

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/new4`);

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

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords2() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/new5`);

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
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordAllBrands
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordNewItem
                    record={record}
                    //deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div>
                <div className="items latest">
                    <div className="row">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Latest Item</h1>
                            </span>

                        </div>
                    </div>

                    <div className="row">
                        {recordList2()}

                    </div>
                    <br />
                    <div class="ribbonstockfirst"></div>
                    <div className="row btnrow">
                        <a href="/stockview"><button type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            View All Items</button></a>

                    </div>
                </div>
                <br />
                <br />
                <br />

                <div className="items">
                    <div className="row">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Items With Less Quantity</h1>
                            </span>
                        </div>
                    </div>

                    <div className="row">

                        <LowStockPrint ref={componentRef} />
                    </div>
                    <br />
                    <div className="row btnrow">
                    <ReactToPrint
                        trigger={() => <button
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >Get Report Of The Items On Low Stock!</button>}
                        content={() => componentRef.current}
                    />
                    </div>
                </div>

                <div className="items latest last">
                    <div className="row">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Latest Brands</h1>
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        {recordList()}
                    </div>
                    <div class="ribbonstock"></div>
                    <div className="row stockribbon">
                        <a href="/brandview"><button type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 btnbrand">
                            View All Brands</button>
                        </a>

                        <a href="/itemtypes"><button type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 btnbrand">
                            Manage Item Types</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}