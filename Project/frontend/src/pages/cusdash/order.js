import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const RecordNewPurchase = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td className="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td className="py-4 px-6">
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
        <td className="py-4 px-6">
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Delete
            </button>
        </td>
    </tr>
);

const RecordAcceptedPurchase = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td className="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td className="py-4 px-6">
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

const RecordDeliveryPurchase = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td className="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td className="py-4 px-6">
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

const RecordDeliveredPurchase = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customername}
        </th>
        <td className="py-4 px-6">
            {props.record.placeddate}
        </td>
        <td className="py-4 px-6">
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
        <td className="py-4 px-6">
            <button
                onClick={() => { props.deleteRecord(props.record._id) }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Delete
            </button>
        </td>
    </tr>
);

export default function Order() {
    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);
    const [records4, setRecords4] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/pending/${localStorage.getItem('cusID')}`);

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
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/accepted/${localStorage.getItem('cusID')}`);

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
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/sent/${localStorage.getItem('cusID')}`);

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
            const response4 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delivered/${localStorage.getItem('cusID')}`);

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

    async function deleteRecord3(id) {
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
                fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delete/${id}`, {
                    method: "DELETE"
                });
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Customer Order has been deleted.',
                    'success'
                ).then(() => {
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
                    'Customer Order Not Deleted:)',
                    'info'
                )
            }
        })
    }

    async function acceptCart1(id) {
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
                fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/accept/${id}`, {
                    method: "POST"
                });

                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Customer Order has been Accepted.!',
                    'success'
                ).then((res) => window.location.reload())
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

    async function deliverCart1(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! Customer Order Will be redirected to Delivery Section!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/send/${id}`, {
                    method: "POST"
                });
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Customer Order has been redirected to Delivery Section!.',
                    'success'
                ).then((res) => window.location.reload())
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

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewPurchase
                    record={record}
                    deleteRecord={() => deleteRecord3(record._id)}
                    acceptCart={() => acceptCart1(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordAcceptedPurchase
                    record={record}
                    deleteRecord={() => deleteRecord3(record._id)}
                    deliverCart={() => deliverCart1(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList3() {
        return records3.map((record) => {
            return (
                <RecordDeliveryPurchase
                    record={record}
                    deleteRecord={() => deleteRecord3(record._id)}

                    key={record._id}
                />
            );
        });
    }

    function recordList4() {
        return records4.map((record) => {
            return (
                <RecordDeliveredPurchase
                    record={record}
                    deleteRecord={() => deleteRecord3(record._id)}

                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div class="topCustomers nogap">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>New Purchases!!</h1>
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
                                    <th scope="col" class="py-3 px-6">
                                        Delete
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {recordList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="topCustomers">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Accpeted Purchases!!</h1>
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
                                {recordList2()}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div class="topCustomers">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Orders Sent To Delivery!!</h1>
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
                                {recordList3()}

                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
            </div>

            <div class="topCustomers">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span class="font-medium">
                            <h1>Delivered Ordered!!</h1>
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
                                    <th scope="col" class="py-3 px-6">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList4()}

                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}