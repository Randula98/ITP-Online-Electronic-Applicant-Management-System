import React, { useEffect, useState, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import Swal from 'sweetalert2';
import "./purchases.css";

import { TopCartPrint } from "./topcartprint";


const RecordNewPurchase = (props) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {props.record.customername}
    </th>
    <td className="py-4 px-6">
      <a href={`/viewcusprof/${props.record.customerid}`}
        target="_blank" rel="noreferrer">
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          View
        </button>
      </a>
    </td>
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
        onClick={() => { props.acceptCart(props.record._id) }}
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Accept
      </button>
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
      <a href={`/viewcusprof/${props.record.customerid}`}
        target="_blank" rel="noreferrer">
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          View
        </button>
      </a>
    </td>
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
        onClick={() => { props.deliverCart(props.record._id) }}
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Send To Delivery
      </button>
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

const RecordDeliveryPurchase = (props) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {props.record.customername}
    </th>
    <td className="py-4 px-6">
      <a href={`/viewcusprof/${props.record.customerid}`}
        target="_blank" rel="noreferrer">
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          View
        </button>
      </a>
    </td>
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

export default function PurchaseManagement() {


  const [records, setRecords] = useState([]);
  const [records2, setRecords2] = useState([]);
  const [records3, setRecords3] = useState([]);

  // This method fetches the records from the database.

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/pending`);

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
      const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/accepted`);

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
      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/sent`);

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

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Customer Order has been deleted.',
          'success'
        )
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

  async function deleteRecord2(id) {
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

        const newRecords2 = records2.filter((el) => el._id !== id);
        setRecords2(newRecords2);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Customer Order has been deleted.',
          'success'
        )
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

        const newRecords3 = records3.filter((el) => el._id !== id);
        setRecords3(newRecords3);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Customer Order has been deleted.',
          'success'
        )
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

        window.location.reload();
        swalWithBootstrapButtons.fire(
          'Success!',
          'Customer Order has been Accepted.!',
          'success'
        )
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

        window.location.reload();
        swalWithBootstrapButtons.fire(
          'Success!',
          'Customer Order has been redirected to Delivery Section!.',
          'success'
        )
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
          deleteRecord={() => deleteRecord1(record._id)}
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
          deleteRecord={() => deleteRecord2(record._id)}
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

  const componentRef = useRef();


  return (

    <div>
      <br />
      <br />
      <br />
      <div>
        <div class="topCustomers">
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
                      View Customer Profile
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
                      Change Status
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
                      View Customer Profile
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
                      Change Status
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Delete
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
                      View Customer Profile
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
                      Remove Order
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {recordList3()}

                </tbody>
              </table>
            </div>
            <br/>
            <div className='row btnrow'>
              <a href="/allcompletedorders">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  View All Completed Orders
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="topCustomers">
          <div className="row">
            <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
              role="alert">
              <span className="font-medium">
                <h1>Top Purchases!!</h1>
              </span>
            </div>
          </div>
          <div className="row">
            <TopCartPrint ref={componentRef} />
          </div>
          <br />
          <div className="row btnrow">
            {/* <a href="#"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Customer Activity Record</button></a> */}
            {/* <ReactToPrint
                        trigger={() => <button>Print this out!</button>}
                        content={() => componentRef.current}
                    /> */}

            <ReactToPrint
              trigger={() => <button
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >Get Report Of The Top Customers!</button>}
              content={() => componentRef.current}
            />

          </div>

        </div>
      </div>
    </div>


  )

}