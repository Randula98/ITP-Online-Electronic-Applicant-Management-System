import React, { useEffect, useState } from 'react'

import "./index.css";


const RecordNewPurchase = (props) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {props.record.fname} {props.record.lname}
    </th>
    <td className="py-4 px-6">
      {props.record.email}
    </td>
    <td className="py-4 px-6">
      {props.record.contactno}
    </td>
    <td className="py-4 px-6">
      {props.record.noOfItems}
    </td>
    <td className="py-4 px-6">
      {props.record.totalPrice}
    </td>
  </tr>
);

export default function PurchaseManagement() {


  const [records2, setRecords2] = useState([]);

  // This method fetches the records from the database.

  useEffect(() => {
    async function getRecords2() {
      const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`);

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


  // This method will map out the records on the table
  function recordList2() {
    return records2.map((record) => {
      return (
        <RecordNewPurchase
          record={record}
          // deleteRecord={() => deleteRecord(record._id)}
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
                      Customer Email
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Customer Contact No
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Number of Items
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Total Amount
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Sachintha Dasanayake
                    </th>
                    <td class="py-4 px-6">
                      sachintha.d@gmail.com
                    </td>
                    <td class="py-4 px-6">
                      0713357788
                    </td>
                    <td class="py-4 px-6">
                      4
                    </td>
                    <td class="py-4 px-6">
                      $2999
                    </td>

                  </tr>

                </tbody>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Sachintha Dasanayake
                    </th>
                    <td class="py-4 px-6">
                      sachintha.d@gmail.com
                    </td>
                    <td class="py-4 px-6">
                      0713357788
                    </td>
                    <td class="py-4 px-6">
                      4
                    </td>
                    <td class="py-4 px-6">
                      $2999
                    </td>

                  </tr>

                </tbody>

              </table>
            </div>

          </div>

        </div>

        <br />
        <br />
        <div class="topCustomers">
          <div class="row">
            <div class="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
              role="alert">
              <span class="font-medium">
                <h1>Top Purchases!!</h1>
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
                      Customer Email
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Customer Contact No
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Number of Purchases
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Total Spent Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td class="py-4 px-6">
                      Sliver
                    </td>
                    <td class="py-4 px-6">
                      Laptop
                    </td>
                    <td class="py-4 px-6">
                      $2999
                    </td>
                    <td class="py-4 px-6">
                      $2999
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <br />
            <div class="row btnrow">
                <a href="#"><button type="button"
                        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Customer Purchase Report</button></a>
            </div>
          </div>

        </div>

        <br />
        <br />
      </div>
    </div>


  )

}