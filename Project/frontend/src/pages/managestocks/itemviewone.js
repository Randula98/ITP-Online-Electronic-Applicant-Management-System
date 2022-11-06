import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./itemviewone.css"


export default function itemviewone() {

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
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/delete/${id}`, {
        method: "DELETE"
    });

    navigate("/stockhome");
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
        <div class="col-span-3"><img src={form.imgurl} alt="" />
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Profile</button>
          <button onClick={() => {
                deleteRecord(form._id);
            }}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >Delete Profile</button>
        </div>

        <div class="">
          
          <br />
          <p class="text-lg sm">{form.itemname} </p>
          <p class="text-lg sm">{form.unitprice} </p>
          <p class="text-lg sm">{form.itemtype} </p>
          <p class="text-lg sm">Total&#160;Purchases&#160;Done&#160;-{form.brand} </p>
          <p class="text-lg sm">Total&#160;Spent&#160;Amount&#160;-{form.unitstock} </p>
          

        </div>


      </div>
    </div>
  )
}