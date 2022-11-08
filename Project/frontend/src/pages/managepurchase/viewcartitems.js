import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./purchases.css";

const RecordCompletedCart = (props) => (
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {props.record.brand}
    </th>
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
    <a href={`/itemviewone/${props.record.itemid}`}>
      <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View</button>
      </a>
    </td>
  </tr>
)

export default function ViewCartItems() {

  const [records, setRecords] = useState([]);
  const params = useParams();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart_item/getitems/${params.id}`);

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

  let total = 0

  for (let i = 0; i < records.length; i++) {
    total += records[i].unitprice;
  }

  function recordList() {
    return records.map((record) => {
      return (
        <RecordCompletedCart
          record={record}
          //updateQuantity={() => updateQuantity(record.quantity, record._id)}
          key={record._id}
        />
      );
    });
  }
  return (
    <div>
      <div className="viewcartitemslist">
        <div className="itemlisttable">

          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Brand
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Item Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Item Type
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Unit Price
                  </th>
                  <th scope="col" class="py-3 px-6">
                    View Item
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

    </div>
  )
}