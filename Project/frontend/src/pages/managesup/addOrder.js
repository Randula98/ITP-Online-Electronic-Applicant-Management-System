//import { View, Text } from 'react-native'
//import React from 'react'
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SupAddOrder() {

  const [form, setForm] = useState({
    supplierid: "",
    date: "",
    itemid: "",
    quantity: "",
    approvedstatus: "",
    orderstatus: "",
    details: "",

  });
  const navigate = useNavigate();

  // These methods will update the state properties.
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

    await fetch("http://localhost:5000/record/add", {
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

    setForm({supplierid : "",date: "",itemid: "",quantity: "",approvedstatus: "",orderStatus: "",details: "",});
    navigate("/managesup"); 
  }
  return (
    <div>
      <div class="f1">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <br />
              <br />
                <br />
                  <br />
                    <br />
                      <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <h1
                            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Order Details
                          </h1>
                          <form onSubmit={onSubmit}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                              {/* <!--supplier id--> */}
                              <div>
                                <label for="supplier id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier
                                  ID</label>
                                <input type="text" name="sid" id="sid"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="S1111" required=""
                                  onChange={(e) => updateForm({supplierid: e.target.value})}/>
                              </div>
                              {/* <!--date--> */}
                              <div>
                                <label for="order date"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order
                                  placed date</label>
                                <input type="date" name="date" id="date"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="" required=""
                                  onChange={(e) => updateForm({date: e.target.value})}/>
                              </div>
                              {/* <!--Product id--> */}
                              <div>
                                <label for="item id"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                                  ID</label>
                                <input type="text" name="pid" id="pid"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="P1111" required=""
                                  onChange={(e) => updateForm({itemid: e.target.value})}/>
                              </div>
                              {/* <!--quantity--> */}
                              <div>
                                <label for="qunatity"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                <input type="number" name="qty" id="qty"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="" required=""
                                  onChange={(e) => updateForm({quantity: e.target.value})}/>
                              </div>

                              {/* <!--approved status--> */}
                              <div>
                                <label for="approved status"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Approved Status</label>
                                <input type="text" name="apst" id="apst"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Pending" required=""
                                  onChange={(e) => updateForm({aprrovedstatus: e.target.value})}/>
                              </div>

                              {/* <!--order status--> */}
                              <div>
                                <label for="order status"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Status</label>
                                <input type="text" name="orst" id="orst"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Pending" required=""
                                  onChange={(e) => updateForm({orderstatus: e.target.value})}/>
                              </div>
                              {/* <!--details--> */}
                              <div>

                                <label for="Details"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Details
                                </label>
                                <textarea id="message" rows="4"
                                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Any additional details about the order..."
                                  onChange={(e) => updateForm({details: e.target.value})}></textarea>


                              </div>

                            </div>

                            <button type="submit"
                              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                              Add Order</button>

                          </form>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>

              </div>

              );
  }