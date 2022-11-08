import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sales.css";

const RecordNewPromos = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 supcard">
        <a href={`/viewpromo/${props.record._id}`}>
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.promoname}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-700">
                {props.record.startdate}<br />
                {props.record.enddate}<br />
            </p>
        </div>
    </div>
);

const RecordNewDiscounts = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 supcard">
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
        <div className="p-5">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.itemname}
                </h5>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-700">
            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-gray-700"><span class="text-lg font-medium text-gray-900 line-through dark:text-white">Rs.{props.record.price}</span><span class="ml-3 text-lg font-medium">Rs.{props.record.discount}</span></h5>
            </p>
        </div>
    </div>
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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/discount/new5`);

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

    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordNewDiscounts
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

                <div className="salesribbon"></div>
                <div className="row btnrow"><br /><br /><br />
                    <a href="/managesales/viewallpromo"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Promotions</button></a>
                </div>
                <br />
            </div>
            <br />

            <div className="salesbody salebody">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Discounts!!</h1>
                        </span>
                    </div>
                </div>
                <div className="row">
                    {recordList2()}
                    <div className="salesribbon"></div>
                    <br /><br /><br />
                    <div className="row btnrow">
                        <a href="/managesales/viewalldiscount"><button type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                            All Discounts</button></a>
                    </div>

                </div>
            </div>
        </div>
    )
}