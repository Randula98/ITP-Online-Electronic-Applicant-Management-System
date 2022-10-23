import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

const RecorditemTypes = (props) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {props.record.type}
    </th>
    <td className="py-4 px-6">
      <button
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
        type="button"
        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete Item Type</button>
    </td>
  </tr>
);

export default function ItemTypes() {

  const [form, setForm] = useState({
    type: "",
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/itemtype/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    Swal.fire({
      icon: 'success',
      title: 'Successfull',
      text: 'New Item Type Added',
    }).then((result) => {
      // Reload the Page
      window.location.reload();
    });

    setForm({ type: "" });
    //window.location.reload(false);
  }

  const [records3, setRecords3] = useState([]);

  useEffect(() => {
    async function getRecords3() {
      const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/itemtype`);

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

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/itemtype/delete/${id}`, {
      method: "DELETE"
    });
    Swal.fire({
      icon: 'error',
      title: 'Deleted',
      text: 'Item Type Deleted'
    })

    const newRecords = records3.filter((el) => el._id !== id);
    setRecords3(newRecords);
  }

  function recordList3() {
    return records3.map((record) => {
      return (
        <RecorditemTypes
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
      <div className="addItemType">

        <h1 class="text-5xl font-extrabold dark:text-white"><small class="ml-2 font-semibold text-gray-500 dark:text-gray-600">Add New Item Type</small></h1>
        <br />
        <form onSubmit={onSubmit}>
          <div class="mb-6">
            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Item Type</label>
            <input
              type="text"
              id="base-input"
              onChange={(e) => updateForm({ type: e.target.value })}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>

      <br />
      <div className="topCustomers">
        <div className="row">
          <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert">
            <span className="font-medium">
              <h1>Customer Loyalty Levels</h1>
            </span>
          </div>
        </div>
        <div className="row">

          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Type
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recordList3()}
              </tbody>
            </table>
          </div>

        </div>
        <br />

      </div>


    </div>
  )
}