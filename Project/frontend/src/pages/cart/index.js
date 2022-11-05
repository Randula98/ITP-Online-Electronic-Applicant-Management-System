import React from 'react'
import './cart.css'

export default function Cart() {
    return (
        <div>
            <div className="cartcontainer">
                <div className="cartheader">
                    <div class="p-4 text-2xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
                        <span class="font-medium">Items in Cart</span>
                    </div>
                </div>

                <div className="cartbody">
                    
                    <div className="cartoneitem">
                        <div class="overflow-x-auto relative">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="py-3 px-6">
                                            Brand
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Item Name
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Item Type
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Unit Price
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Enter Quantity
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Remove Item
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="py-4 px-6">
                                            Sliver
                                        </td>
                                        <td class="py-4 px-6">
                                            Laptop
                                        </td>
                                        <td class="py-4 px-6">
                                            $2999
                                        </td>
                                        <td class="py-4 px-6">
                                            $2999
                                        </td>
                                        <td class="py-4 px-6">
                                            $2999
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br />
                </div>

                <div className="cartfooter">
                    <div className="col-span-3 oneleftcart">
                        <div className="checkoutsection">
                            <a href='/'><button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 checkbtn">Proceed To Checkout</button></a>
                            <br />OR<br />
                            <div className='cardbanner'>
                                <a href="/products" className='conshop'><b>Continue Shopping</b></a>
                            </div>

                            <div className="checkimage">
                            </div>
                        </div>

                    </div>

                    <div className="col-span-3 oneleftcart oneright">
                        <div className="checkoutsection">

                            <div class="overflow-x-auto relative">
                                <table class="w-full text-sm text-left text-gray-900 dark:text-gray-900">
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-400 dark:border-gray-700">
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                                Sub Total :
                                            </th>
                                            <td class="py-4 px-6">
                                                Rs. 58000.00
                                            </td>
                                        </tr>

                                        <tr class="bg-white border-b dark:bg-gray-400 dark:border-gray-700">
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                                Discount :
                                            </th>
                                            <td class="py-4 px-6">
                                                Rs. 5800.00
                                            </td>
                                        </tr>

                                        <tr class="bg-white border-b dark:bg-gray-400 dark:border-gray-700">
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                                Delivery Fee :
                                            </th>
                                            <td class="py-4 px-6">
                                                Rs. 400.00
                                            </td>
                                        </tr>

                                        <tr class="bg-white border-b dark:bg-gray-400 dark:border-gray-700">
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                                Total Cost :
                                            </th>
                                            <td class="py-4 px-6">
                                                Rs. 52600.00
                                            </td>
                                        </tr>



                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}