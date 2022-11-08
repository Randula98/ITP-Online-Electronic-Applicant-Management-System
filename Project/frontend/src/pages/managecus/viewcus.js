import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./managecus.css"

export default function ViewCus() {

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    contactno: "",
    address: "",
    email: "",
    totalpurchases: "",
    totalamount: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/customer/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/viewallcus");
        return;
      }

      setForm(record);
    }
    fetchData();

    return;
  }, [params.id, navigate]);

  async function deleteRecord(id) {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/delete/${id}`, {
      method: "DELETE"
    });

    navigate("/viewallcus");
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
      <div class="viewcus dark:bg-gray-400 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
        <div class="col-span-3"><img src={form.imgurl} alt="" />
          <button onClick={() => {
            deleteRecord(form._id);
          }}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >Delete Profile</button>
        </div>

        <div class="cusdetailscard">
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.fname} {form.lname}</span>
          </div>
          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.contactno}</span>
          </div>
          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.address}</span>
          </div>
          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.email}</span>
          </div>
          <br />
          <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg cusrows" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
              <ul class="mt-1.5 ml-4 text-blue-700 list-disc list-inside">
                <li>Total&#160;Purchases&#160;Done&#160;-{form.totalpurchases}</li>
                <li>Total&#160;Spent&#160;Amount&#160;-{form.totalpayments}</li>
                <li>Loyalty&#160;Level&#160;-&#160;{form.loyaltylevel}</li>
              </ul>
            </div>
          </div>


        </div>


      </div>
    </div>
  )
}