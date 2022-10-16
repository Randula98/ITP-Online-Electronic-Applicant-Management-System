import React, { useEffect, useState } from "react";
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

const RecordNewTargets = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 cuscardlist">
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
                {props.record.contact}<br />
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

export default function SalesManagement() {

    const [records, setRecords] = useState([]);

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

                <div className="ribbon"></div>
                <div className="row btnrow">
                    <a href="/viewallcus"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Promotions</button></a>
                </div>
            </div>

            <br />

            <div className="salesheader salesbody">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Targers!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row">
                    {/* {recordList2()} */}
                </div>
            </div>
        </div>
    )
}