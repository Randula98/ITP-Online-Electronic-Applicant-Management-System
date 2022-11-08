/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./purchases.css";

const RecordCompletedCart = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td className="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td>
            <a href={`/viewcartitems/${props.record.cartid}`}
                target="_blank" rel="noreferrer">
                <button
                    type="button"
                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    View
                </button>
            </a>
        </td>
        <td className="py-4 px-6">
            Rs. {props.record.totalprice}
        </td>
    </tr>
);


export default function SearchCart() {

    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delivered/search/${params.key}`);

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

    function searchRecord(e) {
        const key = search;
        console.log("Search Function");
        console.log(key);
        // alert(key);
        navigate(`/searchcart/${key}`);
    }

    function recordList() {
        return records.map((record) => {
            return (
                <RecordCompletedCart
                    record={record}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <div className="row searchRow">
                <form onSubmit={searchRecord}>
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search"
                            id="default-search"
                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Customer's First Name... "
                            onChange={(e) => setSearch(e.target.value)}
                            required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            <div class="topCustomers">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Completed and Delivered Orders!!</h1>
                        </span>
                    </div>
                </div>
                <div class="row">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Customer Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Placed Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Order
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Price
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {recordList()}

                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )

}

