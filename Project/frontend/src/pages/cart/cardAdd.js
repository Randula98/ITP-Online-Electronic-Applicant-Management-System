import React from "react";
import Swal from 'sweetalert2';
// import { useNavigate } from "react-router";
import jwt_decode from 'jwt-decode';
import { v4 } from "uuid";
import "./card.css";

export default function CardAdd() {

    const [cardno, setCardno] = React.useState("");
    const [cardcvc, setCvc] = React.useState("");


    async function handleSubmit() {
        localStorage.setItem("cusCartID" , (jwt_decode(localStorage.getItem("authToken")).fname + v4()));
        if (cardno.length === 16 && cardcvc.length === 3 && cardno.match(/^[0-9]+$/) && cardcvc.match(/^[0-9]+$/)) {
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your Order is Placed Now!!',
                footer: '<a href="/">Keep Exploring</a>'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/";
                }
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Card Details',
                text: 'Please check the card details!',
            })
        }
    }

    return (
        <div>
            <div className="cardaddhead">
                <center>
                    <h1 className="text-5xl font-extrabold text-grey-400">Add Credit\Debit Card</h1>
                </center>
                <br />
                <div className="frame">
                    <div className="mb-6">
                        <div>
                            <label for="Card Number" class="block mb-2 text-sm font-medium text-white ">Card Number</label>
                            <input type="text" id="inumber"
                                className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="6614 1234 5678 9012"
                                required
                                onChange={(e) => setCardno(e.target.value)}
                            />
                        </div>
                        <br />

                        <div>
                            <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">CVC</label>
                            <input type="text" id="cvc"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="123"
                                required
                                onChange={(e) => setCvc(e.target.value)}
                            />
                        </div>
                        <br />
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">Expiration Year</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>2022</option>
                                    <option value="US">2023</option>
                                    <option value="CA">2024</option>
                                    <option value="FR">2025</option>
                                    <option value="DE">2026</option>
                                    <option value="DE">2027</option>
                                </select>
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">Expiration Month</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>01</option>
                                    <option value="US">02</option>
                                    <option value="CA">03</option>
                                    <option value="FR">04</option>
                                    <option value="DE">05</option>
                                    <option value="DE">06</option>
                                    <option value="FR">07</option>
                                    <option value="DE">08</option>
                                    <option value="DE">09</option>
                                    <option value="FR">10</option>
                                    <option value="DE">11</option>
                                    <option value="DE">12</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}