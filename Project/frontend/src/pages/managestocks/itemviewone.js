import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./itemviewone.css"


export default function ItemViewOne() {

  const [form, setForm] = useState({
    itemname: "",
    unitprice: "",
    itemtype: "",
    brand: "",
    unitstock: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/item/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/Stockhome");
        return;
      }

      setForm(record);
    }
    fetchData();

    return;
  }, [params.id, navigate]);

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
      text: "You won't be able to revert this! You will the Item Details!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/item/delete/${id}`, {
          method: "DELETE"
        });

        navigate("/stockhome");

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


  // This method will delete a record
  // async function deleteRecord(id) {
  //     await fetch(`http://localhost:5000/${id}`, {
  //         method: "DELETE"
  //     });

  //     const newRecords = records.filter((el) => el._id !== id);
  //     setRecords(newRecords);
  // }

  // This method will map out the records on the table
  // function recordList() {
  //   return records.map((record) => {
  //     return (
  //       <ViewCusTag
  //         record={record}
  //         // deleteRecord={() => deleteRecord(record._id)}
  //         key={record._id}
  //       />
  //     );
  //   });
  // }
  return (
    <div>
      <div class="viewcus dark:bg-gray-700 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
        <div class="col-span-3">
          <img src={form.imgurl} alt="" />
          <a href={`/stockupdate/${form._id}`}>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Update Item
            </button>
          </a>
          <button onClick={() => {
            deleteRecord(form._id);
          }}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >Delete Item</button>
        </div>

        <div class="col-span-3">
          <div className="itemdetails">

            <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
              <span class="font-medium">{form.brand} - {form.itemtype}</span>
            </div>
            <br />
            <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
              <span class="font-medium">{form.itemname}</span>
            </div>
            <br />

            <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg itemrows" role="alert">
              <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Info</span>
              <div>
                <ul class="mt-1.5 ml-4 text-blue-700 list-disc list-inside">
                  <li>{form.description}</li>
                </ul>
              </div>
            </div>
            <br />
            <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 itemrows" role="alert">
              <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium"><b>Price - Rs. {form.unitprice}.00</b></span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}