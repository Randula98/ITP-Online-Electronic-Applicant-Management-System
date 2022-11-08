import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import './finance.css'

const PaymentsRecord = (props) => (
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {props.record.date}
    </th>
    <td class="py-4 px-6">
      {props.record.amount}
    </td>
    <td class="py-4 px-6">
      {props.record.name}
    </td>
    <td class="py-4 px-6">
      {props.record.email}
    </td>
    <td class="py-4 px-6">
      {props.record.contactno}
    </td>
    <td class="py-4 px-6">
      {props.record.purpose}
    </td>
    <td class="py-4 px-30">
      <a href={`/editpayments/${props.record._id}`}>
        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Edit
        </button>
      </a>
      <button
        onClick={() => { props.deleteRecord(props.record._id) }}
        type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </td>
  </tr>
)

export default function ViewAllPayments() {

  const [records4, setRecords4] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords2() {
      const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment`);

      if (!response2.ok) {
        const message = `An error occurred: ${response2.statusText}`;
        window.alert(message);
        return;
      }

      const records4 = await response2.json();
      setRecords4(records4);
    }

    getRecords2();

    return;
  }, [records4.length]);

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
      text: "You won't be able to revert this! You will lose the Payment Details!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/delete/${id}`, {
          method: "DELETE"
        });

        const newRecords = records4.filter((el) => el._id !== id);
        setRecords4(newRecords);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Payment Details has been deleted.',
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
          'Payment Details are Not Deleted:)',
          'info'
        )
      }
    })
  }

  // This method will map out the records on the table
  function recordList4() {
    return records4.map((record) => {
      return (
        <PaymentsRecord
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
      <div className="paycont">
        <br />
        <div class="row btnrow">
          <a href="/addpayments"><button type="button"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Add New Payment Details</button></a>
        </div>
        <div class="salestable sap">
          <div class="row">
            <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
              role="alert">
              <span class="font-medium">
                <h1>All Payments</h1>
              </span>

            </div>

          </div>
          <div class="row">
            <div class="row">
              <div class="overflow-x-auto relative">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="py-3 px-6">
                        Payments Date
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Payment Amount
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Recipient Name
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Recipient email
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Recipient Contact No
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Payment Purpose
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
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}