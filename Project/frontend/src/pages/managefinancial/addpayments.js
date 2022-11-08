import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

export default function AddPayments() {

    const [form, setForm] = useState({
        date: "",
        amount: "",
        name: "",
        email: "",
        contactno: "",
        purpose: "",
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPayment = { ...form };

    async function onSubmit(e){
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPayment),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
    
        Swal.fire({
              icon: 'success',
              title: 'Successfull',
              text: 'New Payment Added',
        })
    
        setForm({ date: "",  amount: "", name: "", email: "", contactno: "",  purpose: "" });
        navigate("/managefinance");
    }

    return (
        <div>
            <div className='paycont'>
                <div class="flex p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 payalert" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-large epd"><b>Enter New Payment Details</b></span>
                    </div>
                </div>

                <div className="payform">
                    <form autoComplete='off' onSubmit={onSubmit}>
                        <div class="mb-6">
                            <label
                                for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Payment Amount</label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="500000"
                                onChange={(e) => updateForm({ amount: e.target.value })}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Name</label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John Doe"
                                onChange={(e) => updateForm({ name: e.target.value })}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Email</label>
                            <input
                                type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="JohnDoe@gmail.com"
                                onChange={(e) => updateForm({ email: e.target.value })}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Contact Number</label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="011-5533621"
                                onChange={(e) => updateForm({ contactno: e.target.value })}
                                required />
                        </div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Payment Purpose</label>
                        <textarea
                            id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Payment for 10 Electronic Applicants"
                            onChange={(e) => updateForm({ purpose: e.target.value })}
                            required></textarea>

                        <br />
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
                <br />
            </div>
        </div>
    )
}