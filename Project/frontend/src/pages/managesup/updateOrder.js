import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function UpdateOrder() {

  const [form, setForm] = useState({
    supplierid: "",
    date: "",
    itemid: "",
    quantity: "",
    approvedstatus: "",
    orderstatus: "",
    details: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/order/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/managesup");
        return;
      }

      setForm(record);
    }
    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const editedRecord = {
      type: form.type,
      discount: form.discount,
      payments: form.payments,
    }

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/update/${params.id.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecord),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    Swal.fire({
      icon: 'success',
      title: 'Successfull',
      text: 'Order Details Updated',
    })

    setForm({ supplierid: "", date: "", itemid: "", quantity: "", approvedstatus: "", orderstatus: "", details: "" });
    navigate("/managesup");
  }

  return (
    <div>
      <div class="f1">
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div
              class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Update Order Details
                </h1>
                <form onSubmit={onSubmit}>
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    {/* <!--supplier id--> */}
                    <div>
                      <label for="supplier id"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier
                        ID</label>
                      <input type="text" name="sid" id="sid"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="S1111"
                        defaultValue={form.supplierid}
                        onChange={(e) => updateForm({ supplierid: e.target.value })}
                        required="" />
                    </div>
                    {/* <!--date--> */}
                    <div>
                      <label for="order date"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order
                        placed date</label>
                      <input type="date" name="date" id="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        defaultValue={form.date}
                        onChange={(e) => updateForm({ date: e.target.value })}
                        required="" />

                    </div>
                    {/* <!--Product id--> */}
                    <div>
                      <label for="item id"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                        ID</label>
                      <input type="text" name="pid" id="pid"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="P1111"
                        defaultValue={form.itemid}
                        onChange={(e) => updateForm({ itemid: e.target.value })}
                        required="" />
                    </div>
                    {/* <!--quantity--> */}
                    <div>
                      <label for="qunatity"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                      <input type="number" name="qty" id="qty"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        defaultValue={form.quantity}
                        onChange={(e) => updateForm({ quantity: e.target.value })}
                        required="" />
                    </div>
                    {/* <!--approved status--> */}
                    <div>
                      <label for="approved status"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Approved Status</label>
                      <input type="text" name="astatus" id="astatus"

                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Pending"
                        defaultValue={form.itemid}
                        onChange={(e) => updateForm({ approvedstatus: e.target.value })}
                        required="" />
                    </div>



                    {/* <!--details--> */}
                    <div>

                      <label for="Details"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Details
                      </label>
                      <textarea id="message" rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Any additional details about the order..."
                        defaultValue={form.details}
                        onChange={(e) => updateForm({ details: e.target.value })}
                      ></textarea>


                    </div>

                  </div>

                  <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Update Order Details</button>

                  <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Cancel</button>

                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}