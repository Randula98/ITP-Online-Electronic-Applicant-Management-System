/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './finance.css'

const RecordPendingLoans = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="py-4 px-6">
            {props.record.loandate}
        </td>
        <td class="py-4 px-6">
            {props.record.amount}
        </td>
        <td class="py-4 px-6">
            {props.record.duration}
        </td>
        <td class="py-4 px-6">
            {props.record.loanpurpose}
        </td>
        <td class="py-4 px-6">
            <a href={`/viewemployee/${props.record._id}`}><button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Profile</button></a>
        </td>
        <td class="py-4 px-6">
            {props.record.status}
        </td>
        <td class="py-4 px-6">
            <a href={`/editloan/${props.record._id}`}>
                <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Edit</button>
            </a>
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }}><span className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</span></button>
        </td>
    </tr>
)

export default function AllLoans() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [records1, setRecords1] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loan`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords1(records);
        }

        getRecords();

        return;
    }, [records1.length]);

    function searchRecord(e) {
        const key = search;
        console.log("Search Function");
        console.log(key);
        // alert(key);
        navigate(`/searchloans/${key}`);
    }

    async function deleteRecord1(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will lose the Loan Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/loan/delete/${id}`, {
                    method: "DELETE"
                });

                const newRecords = records1.filter((el) => el._id !== id);
                setRecords1(newRecords);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Loan Details has been deleted.',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Loan Details are Not Deleted:)',
                    'info'
                )
            }
        })
    }

    // This method will map out the records on the table
    function recordList1() {
        return records1.map((record) => {
            return (
                <RecordPendingLoans
                    record={record}
                    deleteRecord={() => deleteRecord1(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div class="loancont">
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
                                placeholder="Enter Loan Purpose... "
                                onChange={(e) => setSearch(e.target.value)}
                                required="" />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
                <br />

                <div class="overflow-x-auto relative">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Requested Date
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Loan Amount
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Duration
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Loan Purpose
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Employee Profile
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Loan Status
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordList1()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}