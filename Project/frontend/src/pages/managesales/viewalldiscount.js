import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import './sales.css'

const RecordItems = (props) => (
  <div
    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-600 dark:border-gray-400 brandcard itemcardview itemtypeitemdist">
    <div className="brandcardimg">
      <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
    </div>
    <div className="p-5">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.itemname}
      </h5>
      <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-gray-700"><span class="text-lg font-medium text-gray-900 line-through dark:text-white">Rs.{props.record.price}</span><span class="ml-3 text-lg font-medium">Rs.{props.record.discount}</span>
      </h5>
      <button 
      onClick={() => {props.deleteRecord(props.record._id)}}
      type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
    </div>
  </div>
);

export default function ViewAllDiscount() {

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function searchRecord(e) {
    const key = search;
    console.log("Search Function");
    console.log(key);
    // alert(key);
    navigate(`/managesales/searchdist/${key}`);
  }

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/discount`);

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

  //This method will delete a record
  async function deleteRecord(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
        cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! You will the Item Details!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/discount/delete/${id}`, {
          method: "DELETE"
        });
    
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);

        navigate("/managesales/viewalldiscount");

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'This Item has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'This Item is Not Deleted:)',
          'info'
        )
      }
    })
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <RecordItems
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }


  return (
    <div>
      <div className="distcont">
        <div className="row btnrow">
          <br />
          <a href="/managesales/setdiscountadd"><button type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Add New Discount</button></a>
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
                placeholder="Enter Items's Name... "
                onChange={(e) => setSearch(e.target.value)}
                required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>

        <div className="distView">
          {recordList()}
        </div>
      </div>
    </div>
  )
}