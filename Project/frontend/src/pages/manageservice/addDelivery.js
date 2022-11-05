import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


export default function AddDelivery() {

  const [form, setForm] = useState({
    itemid: "",
    itemname: "",
		stars: "",
		remarks: "",
		customerid: "",
		date: "",
		status: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch(`${BASE_URL}/delivery/add`, {
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
        text: 'New Delivery Added',
      })

    setForm({ itemid: "", stars: "", remarks: "", customerid: "", date: "", status: "" });
    navigate("/manageservice");
  }
  return (
    <div>
      <div className="f2">
        <section className="bg-gray-50 dark:bg-gray-900" />
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <br />
          <br />
          <br />
          <br />
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Delivery Details
              </h1>
              <form onSubmit={onSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  {/* <!--<div>
                                    <label for="Repair ID"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair
                                        ID</label>
                                    <input type="text" name="rID" id="rID"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Repair ID" required="">
                                </div> --> */}
                  <div>
                    <label for="Item ID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item
                      ID</label>
                    <input type="text" name="itemID" id="itemID" placeholder="Enter Item ID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => updateForm({ itemid: e.target.value })} />

                  </div>

                  <div>
                    <label for="Item Name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item
                      Name</label>
                    <input type="text" name="itemName" id="itemName" placeholder="Enter Item Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => updateForm({ itemname: e.target.value })} />

                  </div>

                  <div>
                    <label for="Customer ID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer
                      ID</label>
                    <input type="text" name="cID" id="cID" placeholder="Enter Customer ID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => updateForm({ customerid: e.target.value })} />

                  </div>



                  <div>
                    <label for="Delivery Date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivery Date
                    </label>
                    <input type="date" name="Ddate" id="rdate" placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => updateForm({ date: e.target.value })} />

                  </div>



                  <div>
                    <label for="Remarks"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks

                    </label>
                    <textarea id="description" name="description" rows="4" placeholder="Enter Remarks"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) => updateForm({ remarks: e.target.value })}>

                    </textarea>
                  </div>

                </div>

                <button type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  Add Delivery</button>


              </form>
            </div>
          </div>
        </div>

        <section />
      </div>
    </div>
  )

}