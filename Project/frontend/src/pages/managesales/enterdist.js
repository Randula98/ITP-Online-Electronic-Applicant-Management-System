import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import './sales.css'

export default function EnterDist() {

    const [form, setForm] = useState({
        _id: "",
        itemname: "",
        unitprice: "",
        itemtype: "",
        brand: "",
        unitstock: "",
    });

    const [id , setId] = useState("");
    
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

    const [form2, setForm2] = useState({
        itemid: params.id,
        itemname: form.itemname,
        itemtype: form.itemtype,
        brand: form.brand,
        price: form.unitprice,
        imgurl: form.imgurl,
        discount: "",
    });

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { 
            itemid: params.id,
            itemname: form.itemname,
            itemtype: form.itemtype,
            brand: form.brand,
            price: form.unitprice,
            imgurl: form.imgurl,
            discount: form2.discount,
        };

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/discount/add`, {
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
            text: 'New Discount Item Added',
        })

        setForm({ _id: "", itemname: "", unitprice: "", itemtype: "", brand: "", unitstock: "", imgurl: "" });
        navigate("/managesales/viewalldiscount");
    }

    return (
        <div>
            <div className="enterdist">

                <div className="distform">
                    <div class="p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
                        <span class="font-medium">Enter Item Discount Details - Amount</span>
                    </div>
                    <br />
                    <form onSubmit={onSubmit}>
                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Item ID</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                value={form._id}
                                disabled />
                        </div>

                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Item Name</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                value={form.itemname}
                                disabled />
                        </div>

                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Item Type</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                value={form.itemtype}
                                disabled />
                        </div>

                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Item Brand</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                value={form.brand}
                                disabled />
                        </div>

                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Item Price</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                value={form.unitprice}
                                disabled />
                        </div>

                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Item Image</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                value={form.imgurl}
                                disabled />
                        </div>

                        <div class="mb-6">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Discount Price(Enter this)*</label>
                            <input
                                type="text"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setForm2({ ...form2, discount: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}