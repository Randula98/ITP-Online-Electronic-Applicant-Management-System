/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "./supplier.css";

const RecordNewSup = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 supcard">
        <a href={`/viewsup/${props.record._id}`}>
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
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
            <a href={`/viewsup/${props.record._id}`} target="_blank" rel="noreferrer"
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

const RecordNewOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.date}
        </th>
        <td class="py-4 px-6">
            {props.record.brand}
        </td>
        <td class="py-4 px-6">
            {props.record.itemname}
        </td>
        <td class="py-4 px-6">
            {props.record.itemtype}
        </td>
        <td class="py-4 px-6">
            {props.record.unitprice}
        </td>
        <td class="py-4 px-6">
            {props.record.quantity}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.setAccept(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Accept
            </button>
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline
            </button>
        </td>

    </tr>
);

const RecordAcceptedOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.date}
        </th>
        <td class="py-4 px-6">
            {props.record.brand}
        </td>
        <td class="py-4 px-6">
            {props.record.itemname}
        </td>
        <td class="py-4 px-6">
            {props.record.itemtype}
        </td>
        <td class="py-4 px-6">
            {props.record.unitprice}
        </td>
        <td class="py-4 px-6">
            {props.record.quantity}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.setSent(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Sent To Delivery
            </button>
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline
            </button>
        </td>

    </tr>
);

const RecordSentOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.date}
        </th>
        <td class="py-4 px-6">
            {props.record.brand}
        </td>
        <td class="py-4 px-6">
            {props.record.itemname}
        </td>
        <td class="py-4 px-6">
            {props.record.itemtype}
        </td>
        <td class="py-4 px-6">
            {props.record.unitprice}
        </td>
        <td class="py-4 px-6">
            {props.record.quantity}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.setDelivered(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Order Delivered
            </button>
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline
            </button>
        </td>

    </tr>
);

const RecordDeliveredOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.date}
        </th>
        <td class="py-4 px-6">
            {props.record.brand}
        </td>
        <td class="py-4 px-6">
            {props.record.itemname}
        </td>
        <td class="py-4 px-6">
            {props.record.itemtype}
        </td>
        <td class="py-4 px-6">
            {props.record.unitprice}
        </td>
        <td class="py-4 px-6">
            {props.record.quantity}
        </td>
        <td class="py-4 px-6">

            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline
            </button>
        </td>

    </tr>
);


export default function SupplierManagement() {

    const [records, setRecords] = useState([]);
    const [records4, setRecords4] = useState([]);
    const [records5, setRecords5] = useState([]);
    const [records6, setRecords6] = useState([]);
    const [records7, setRecords7] = useState([]);

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
    }, [records.length]);

    useEffect(() => {
        async function getRecords4() {
            const response4 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/pendingorders`);

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

    useEffect(() => {
        async function getRecords5() {
            const response5 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/accepted`);

            if (!response5.ok) {
                const message = `An error occurred: ${response5.statusText}`;
                window.alert(message);
                return;
            }

            const records5 = await response5.json();
            setRecords5(records5);
        }

        getRecords5();

        return;
    }, [records5.length]);

    useEffect(() => {
        async function getRecords6() {
            const response6 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/sent`);

            if (!response6.ok) {
                const message = `An error occurred: ${response6.statusText}`;
                window.alert(message);
                return;
            }

            const records6 = await response6.json();
            setRecords6(records6);
        }

        getRecords6();

        return;
    }, [records6.length]);

    useEffect(() => {
        async function getRecords7() {
            const response7 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/recieved`);

            if (!response7.ok) {
                const message = `An error occurred: ${response7.statusText}`;
                window.alert(message);
                return;
            }

            const records7 = await response7.json();
            setRecords7(records7);
        }

        getRecords7();

        return;
    }, [records7.length]);

    async function deleteRecord(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will lose the order!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/order/delete/${id}`, {
                    method: "DELETE"
                });

                const newRecords = records.filter((el) => el._id !== id);
                setRecords(newRecords);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Placed Order has been deleted.',
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
                    'Placed Order Not Deleted:)',
                    'info'
                )
            }
        })
    }

    async function setAccept(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "After Accepting the order will redirect to the Accepted Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/order/accept/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Customer Order has been Accepted.!',
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
                    'Customer Order Status Not Changed:)',
                    'info'
                )
            }
        })

    }

    async function setSent(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "After Accepting the order will redirect to the Sent To Delivery Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/order/sent/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Order has been Sent To Delivery Section.!',
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
                    'Order Status Not Changed:)',
                    'info'
                )
            }
        })

    } 

    async function setDelivered(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "After Accepting the order will redirect to the Sent To Recieved Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/order/recieved/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Order has been Sent To Recieved Section.!',
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
                    'Order Status Not Changed:)',
                    'info'
                )
            }
        })

    } 

    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewSup
                    record={record}
                    key={record._id}
                />
            );
        });
    }

    function recordList2() {
        return records4.map((record) => {
            return (
                <RecordNewOrders
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    setAccept={() => setAccept(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList3() {
        return records5.map((record) => {
            return (
                <RecordAcceptedOrders
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    setSent={() => setSent(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList4() {
        return records6.map((record) => {
            return (
                <RecordSentOrders
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    setDelivered={() => setDelivered(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList5() {
        return records7.map((record) => {
            return (
                <RecordDeliveredOrders
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    setDelivered={() => setDelivered(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div className="newSupplier">
                <div className="addbtn">
                    <a href="/addOrder" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Order</button>
                    </a>

                    <a href="/addSupplier" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Supplier</button>
                    </a>

                    <a href="/addPreOrder" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Pre-Order</button>
                    </a>
                </div>
                <div className="row">
                    {/* <a href="/addOrder" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Order</button>
                    </a>

                    <a href="/addSupplier" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Supplier</button>
                    </a>

                    <a href="/addPreOrder" target="_blank">
                        <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Pre-Order</button>
                    </a> */}
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
                    <a href="/viewallsup" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Suppliers</button></a>
                </div>
            </div>

            <div className="newSupplier">
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>New Requested Orders</h1>
                            </span>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Ordered Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Brand
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Requested Quantity
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
            </div>

            <div className="newSupplier">
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Accepted Orders</h1>
                            </span>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Ordered Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Brand
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Requested Quantity
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
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

            <div className="newSupplier">
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Orders Sent To Suppliers</h1>
                            </span>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Ordered Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Brand
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Requested Quantity
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
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

            <div className="newSupplier">
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                            role="alert">
                            <span className="font-medium">
                                <h1>Recieved Orders</h1>
                            </span>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Ordered Date
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Brand
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Requested Quantity
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList5()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <br />


        </div>
    )
}