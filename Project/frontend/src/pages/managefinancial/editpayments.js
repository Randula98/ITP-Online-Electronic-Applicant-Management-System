import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function EditPayments() {

    const [form, setForm] = useState({
        date: "",
        amount: "",
        name: "",
        email: "",
        contactno: "",
        purpose: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/payment/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/managefinance");
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

    const newPayment = {
        date: form.date,
        amount: form.amount,
        name: form.name,
        email: form.email,
        contactno: form.contactno,
        purpose: form.purpose
    };

    async function onSubmit(e) {
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/update/${params.id.toString()}`, {
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

        setForm({ date: "", amount: "", name: "", email: "", contactno: "", purpose: "" });

        Swal.fire({
            icon: 'success',
            title: 'Successfull',
            text: 'Payment Details are Updated!!',
      })
        navigate("/managefinance");
    }

    return (
        <div>
            <div className='paycont'>
                <div class="flex p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 payalert" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-large epd"><b>Edit Payment Details</b></span>
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
                                placeholder="Rs 500000"
                                defaultValue={form.amount}
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
                                defaultValue={form.name}
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
                                defaultValue={form.email}
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
                                defaultValue={form.contactno}
                                onChange={(e) => updateForm({ contactno: e.target.value })}
                                required />
                        </div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Payment Purpose</label>
                        <textarea
                            id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Purchase for 10 Apple iPhone 14 Mobile Phones"
                            defaultValue={form.purpose}
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