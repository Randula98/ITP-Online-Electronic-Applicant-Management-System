import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2'

export default function SupAddOrder() {

  const params = useParams();
  const navigate = useNavigate();

  //get item details  
  const [brand, setBrand] = useState({});
  const [itemname, setItemname] = useState({});
  const [unitprice, setUnitprice] = useState({});
  const [itemtype, setItemtype] = useState({});
  const [quantity , setQuantity] = useState({});

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

      setBrand(record.brand);
      setItemname(record.itemname);
      setUnitprice(record.unitprice);
      setItemtype(record.itemtype);
    }
    fetchData();


    return;
  }, [params.id, navigate]);



  const [form2, setForm2] = useState({
    date: "",
    itemid: params.id,
    brand: brand,
    itemname: itemname,
    itemtype: itemtype,
    unitprice: unitprice,
    quantity: "10",
    status: "",
  });

  //alert(form2.brand);

  //alert(form2.itemid);

  //alert(form2.itemid)

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm2((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    //When a post request is sent to the create url, we'll add a new record to the database.
    const newOrder = { 
      date: "",
      itemid: params.id,
      brand: brand,
      itemname: itemname,
      itemtype: itemtype,
      unitprice: unitprice,
      quantity: quantity,
      status: "pending",
     };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

      Swal.fire(
        'Success?',
        'Item Stocks Ordered Succeefully?',
        'success'
      )


    navigate("/Stockhome");
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
                <form autoComplete="off" onSubmit={onSubmit}>
                  <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Item Brand</label>
                    <input type="text" id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={brand}
                      onChange={(e) => updateForm({ brand: e.target.value })}
                      disabled
                    />
                  </div>

                  <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Item Name</label>
                    <input type="text" id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={itemname}
                      onChange={(e) => updateForm({ itemname: e.target.value })}
                      disabled
                    />
                  </div>

                  <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Item Type</label>
                    <input type="text" id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={itemtype}
                      onChange={(e) => updateForm({ itemtype: e.target.value })}
                      disabled
                    />
                  </div>

                  <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unit Price</label>
                    <input type="text" id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={unitprice}
                      onChange={(e) => updateForm({ unitprice: e.target.value })}
                      disabled
                    />
                  </div>

                  <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter Requesting Quantity</label>
                    <input type="text" id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

              </div>
            </div>
          </div>
        </section>

      </div>

    </div>

  );
}