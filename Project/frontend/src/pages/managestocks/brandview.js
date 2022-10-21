
import React, { useEffect, useState } from "react";
import './Stock.css'

const RecordAllBrands = (props) => (
  <div
    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandcard">
    <div className="brandcardimg">
      <a href="#">
        <img className="rounded-t-lg" src={props.record.brandurl} alt="" />
      </a>
    </div>
    <div className="p-5">
      <a href="#">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.bname}
        </h5>
      </a>

      <button type="button"
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          props.deleteRecord(props.record._id);
      }}
      >
        Delete</button>

    </div>
  </div>
);

export default function BrandView() {

  const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/`);

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

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/delete/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <RecordAllBrands
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
      <div className="stockviewhead">
        <a href="/addbrand"><button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Brands</button></a>
      </div>

      <div className="stockviewbody">
        {recordList()}

      </div>
    </div>
  )
}