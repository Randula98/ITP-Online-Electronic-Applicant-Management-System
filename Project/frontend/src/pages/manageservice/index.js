import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import "./serdash.css";
import './serv.css'

const RecordNewRepairs = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.itemname}
        </th>
        <td class="py-4 px-6">
            {props.record.repairdate}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => {
                    Swal.fire(
                        'Desciption',
                        `${props.record.description}`,
                        'question'
                    )
                }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => {
                    Swal.fire({
                        imageUrl: `${props.record.imgurl}`,
                        imageHeight: 500,
                        imageAlt: 'image'
                    })
                }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td>
            <a href={`/viewcus/${props.record.customerid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.setAccept(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Accept</button>
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline</button>
        </td>
    </tr>


);

const RecordAcceptedRepairs = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.itemname}
        </th>
        <td class="py-4 px-6">
            {props.record.repairdate}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => {
                    Swal.fire(
                        'Desciption',
                        `${props.record.description}`,
                        'question'
                    )
                }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => {
                    Swal.fire({
                        imageUrl: `${props.record.imgurl}`,
                        imageHeight: 500,
                        imageAlt: 'image'
                    })
                }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td>
            <a href={`/viewcus/${props.record.customerid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.setCompleted(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Completed</button>
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline</button>
        </td>
    </tr>


);

const RecordCompletedRepairs = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.itemname}
        </th>
        <td class="py-4 px-6">
            {props.record.repairdate}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => {
                    Swal.fire(
                        'Desciption',
                        `${props.record.description}`,
                        'question'
                    )
                }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => {
                    Swal.fire({
                        imageUrl: `${props.record.imgurl}`,
                        imageHeight: 500,
                        imageAlt: 'image'
                    })
                }}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View</button>
        </td>
        <td>
            <a href={`/viewcus/${props.record.customerid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Delete</button>
        </td>
    </tr>


);

const RecordNewDeliveriesRepairs = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td class="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td class="py-4 px-6">
            <a href={`/viewcus/${props.record.customerid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td class="py-4 px-6">
            <a href={`/viewcartitems/${props.record.cartid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td>
            Rs. {props.record.totalprice}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.setDelivered(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Delivered</button>
            <button
                onClick={() => { props.deleteRecordcart(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline</button>
        </td>
    </tr>


);

const RecordDeliveredOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td class="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td class="py-4 px-6">
            <a href={`/viewcus/${props.record.customerid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td class="py-4 px-6">
            <a href={`/viewcartitems/${props.record.cartid}`}>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
                </button>
            </a>
        </td>
        <td>
            Rs. {props.record.totalprice}
        </td>
        <td class="py-4 px-6">
            <button
                onClick={() => { props.deleteRecordcart(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Delete</button>
        </td>
    </tr>


);

export default function ServiceManagement() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);
    const [records4, setRecords4] = useState([]);
    const [records5, setRecords5] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/pending`);

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
        async function getRecords() {
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/accepted`);

            if (!response2.ok) {
                const message = `An error occurred: ${response2.statusText}`;
                window.alert(message);
                return;
            }

            const records2 = await response2.json();
            setRecords2(records2);
        }

        getRecords();

        return;
    }, [records2.length]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/completed`);

            if (!response3.ok) {
                const message = `An error occurred: ${response3.statusText}`;
                window.alert(message);
                return;
            }

            const records3 = await response3.json();
            setRecords3(records3);
        }

        getRecords();

        return;
    }, [records3.length]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response4 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/sent`);

            if (!response4.ok) {
                const message = `An error occurred: ${response4.statusText}`;
                window.alert(message);
                return;
            }

            const records4 = await response4.json();
            setRecords4(records4);
        }

        getRecords();

        return;
    }, [records4.length]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response5 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delivered`);

            if (!response5.ok) {
                const message = `An error occurred: ${response5.statusText}`;
                window.alert(message);
                return;
            }

            const records5 = await response5.json();
            setRecords5(records5);
        }

        getRecords();

        return;
    }, [records5.length]);

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
            text: "You won't be able to revert this! You will lose the Repair Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/delete/${id}`, {
                    method: "DELETE"
                });

                const newRecords = records.filter((el) => el._id !== id);
                setRecords(newRecords);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Repair Details has been deleted.',
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
                    'Repair Details Not Deleted:)',
                    'info'
                )
            }
        })
    }

    async function deleteRecordcart(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will lose the Repair Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delete/${id}`, {
                    method: "DELETE"
                });

                const newRecords = records.filter((el) => el._id !== id);
                setRecords(newRecords);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Repair Details has been deleted.',
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
                    'Repair Details Not Deleted:)',
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
            text: "After Accepting the Repair will redirect to the Accepted Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/accept/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Repair / Service has been Accepted.!',
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
                    'Repair / Service Status Not Changed:)',
                    'info'
                )
            }
        })

    }

    async function setCompleted(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "After Accepting the Repair will redirect to the Completed Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/complete/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Repair / Service has been Completed.!',
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
                    'Repair / Service Status Not Changed:)',
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
            text: "After Accepting the Order will redirect to the Delivered Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delivered/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Order has been Delivered.!',
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
                <RecordNewRepairs
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    setAccept={() => setAccept(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordAcceptedRepairs
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    setCompleted={() => setCompleted(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList3() {
        return records3.map((record) => {
            return (
                <RecordCompletedRepairs
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    //setCompleted={() => setCompleted(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList4() {
        return records4.map((record) => {
            return (
                <RecordNewDeliveriesRepairs
                    record={record}
                    deleteRecordcart={() => deleteRecordcart(record._id)}
                    setDelivered={() => setDelivered(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList5() {
        return records5.map((record) => {
            return (
                <RecordDeliveredOrders
                    record={record}
                    deleteRecordcart={() => deleteRecordcart(record._id)}
                    setDelivered={() => setDelivered(record._id)}
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
            <div className="newRepairs">

                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Repairs.!!</h1>
                        </span>
                    </div>
                </div>
                <div className="servrow">
                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Placed Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Description
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Image
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Customer
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList()}
                            </tbody>
                        </table>
                    </div>
                </div >
                <br />
                <div className="row btnrow">
                    <a href="/manageservice/viewallrep" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Repairs</button></a>

                </div>
            </div>

            <div className="newRepairs">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Accepted Repairs.!!</h1>
                        </span>
                    </div>
                </div>

                <div className="servrow">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Placed Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Description
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Image
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Customer
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList2()}
                            </tbody>
                        </table>
                    </div>

                </div >
            </div>

            <div className="newRepairs">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Completed Repairs.!!</h1>
                        </span>
                    </div>
                </div>

                <div className="servrow">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Placed Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Description
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Image
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Customer
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList3()}
                            </tbody>
                        </table>
                    </div>

                </div >
                <br />

                <div className="row btnrow">
                    <a href="/manageservice/viewallrep" target="_blank"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View
                        All Repairs</button></a>

                </div>
            </div>

            <div className="newRepairs">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Deliveries.!!</h1>
                        </span>
                    </div>
                </div>

                <div className="servrow">
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
                                        View Customer Profile
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Cart Items
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Price
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList4()}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>

            <div className="newRepairs">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Delivered Orders!!</h1>
                        </span>
                    </div>
                </div>

                <div className="servrow">
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
                                        View Customer Profile
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Cart Items
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Price
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList5()}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>

        </div>



    )

}