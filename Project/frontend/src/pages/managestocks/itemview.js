import React, { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import './Stock.css'

const RecordItems = (props) => (
  <div
    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandcard itemcardview">
    <div className="brandcardimg">
      <a href={`/itemviewone/${props.record._id}`}>
        <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
      </a>
    </div>
    <div className="p-5">
      <a href={`/itemviewone/${props.record._id}`}>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.itemname}
        </h5>
      </a>
      
      <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-gray-700">Rs.{props.record.unitprice}
        </h5> 
        <a href={`/itemviewone/${props.record._id}`}>
        <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          View Item</button>
        </a>

    </div>
  </div>
);

export default function ItemView() {
  const [records, setRecords] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/brand/${params.brand}`);

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
  // async function deleteRecord(id) {
  //   await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/delete/${id}`, {
  //     method: "DELETE"
  //   });

  //   const newRecords = records.filter((el) => el._id !== id);
  //   setRecords(newRecords);
  // }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <RecordItems
          record={record}
          //deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }


  const [search, setSearch] = useState("");

  function searchRecord(e) {
    const key = search;
    console.log("Search Function");
    console.log(key);
    // alert(key);
    navigate(`/itemsearch/${key}`);
  }
  
  return (
    <div>
      <div className="stockviewhead">
        <a href="/addstock"><button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Stocks</button></a>
      </div>
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
              placeholder="Enter Item Name... "
              onChange={(e) => setSearch(e.target.value)}
              required="" />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>

      

      <div className="brandcarditems">
        {recordList()}

      </div>
    </div>
  )
}