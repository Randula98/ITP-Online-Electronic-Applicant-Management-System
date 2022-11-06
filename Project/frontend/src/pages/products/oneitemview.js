/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import './product.css'

export default function OneItemView() {

  if (localStorage.getItem("session") === null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have to login as a customer!'
    }).then((result) => {
      navigate("/login/cuslogin");
    })
  }

  async function addToCart(e) {
    e.preventDefault();
    
    const cartitem = {
      cartid: localStorage.getItem("cusCartID"),
      itemid: form._id,
      brand: form.brand,
      itemname: form.itemname,
      itemtype: form.itemtype,
      unitprice: form.unitprice,
      quantity: 1,
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart_item/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartitem),
    }).catch((err) => {
      alert(err);
    });

    const content = await response.json();

    Swal.fire({
      icon: 'success',
      title: 'Successful',
      text: 'New Item Added To The Cart!',
      footer: '<a href="/cart">Go to Cart!</a>'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/brands");
      }
    })

  }

  const [form, setForm] = useState({
    itemname: "",
    unitprice: "",
    itemtype: "",
    brand: "",
    unitstock: "",
    imgurl: "",
    description: "",
    records: [],
  });

  const [form2, setForm2] = useState({
    bname: "",
    brandurl: "",
    records2: [],
  })

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
        navigate("/");
        return;
      }

      setForm(record);
    }
    fetchData();
  }, [params.id, navigate]);


  return (
    <div>
      <div className="oneitemview">
        <div class="col-span-3 oneleft">
          <div class="oneitemimg">
            <img src={form.imgurl} alt="item" className="itemimg" />
          </div>
          <div className="cartbtn">
            <button
              onClick={addToCart}
              type="button"
              class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add To Cart!</button>
          </div>
        </div>

        <div class="col-span-3 oneleft tworight">

          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium"><a href={`/branditemview/${form.brand}`}>{form.brand}</a> ◾ <a href={`/typeitemview/${form.itemtype}`}>{form.itemtype}</a></span>
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
  )
}