import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import './cart.css'

const RecordCartItem = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.brand}
        </th>
        <td class="py-4 px-6">
            {props.record.itemname}
        </td>
        <td class="py-4 px-6">
            {props.record.itemtype}
        </td>
        <td class="py-4 px-6">
            Rs. {props.record.unitprice}.00
        </td>
        <td class="py-4 px-6">
            <a href={`/oneitemview/${props.record.itemid}`} target="_blank" rel="noreferrer">
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    View
                </button>
            </a>
        </td>
        <td class="py-4 px-6">
            {/* <input type="tel"
                name="floating_company"
                id="floating_company"
                class="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                defaultValue="1"
                pattern="[0-9]*"
                value={props.value}
                required /> */}
            {props.record.quantity}
        </td>
        <td class="py-4 px-6">
            <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => { props.deleteRecord(props.record._id) }}>
                Remove
            </button>
        </td>
    </tr>
)

export default function Cart() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart_item/getitems/${localStorage.getItem("cusCartID")}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();

        return;
    }, [records.length]);

    let total = 0

    for (let i = 0; i < records.length; i++) {
        total += records[i].unitprice;
    }


    // get discount by loyalty level
    let discount = 0
    useEffect(() => {
        async function getDiscount() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loyalty/getloyalty/${localStorage.getItem("cusLoyaltylevel")}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records2 = await response.json();
            setRecords2(records2);
        }
        getDiscount();
    }, [records2.length]);

    discount = total * 8 / 100;

    let totalcost = total - discount + 400;

    function recordList() {
        return records.map((record) => {
            return (
                <RecordCartItem
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    //updateQuantity={() => updateQuantity(record.quantity, record._id)}
                    key={record._id}
                />
            );
        });
    }

    async function deleteRecord(id) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will lose all your data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/cart_item/delete/${id}`, {
                    method: "DELETE"
                });

                const newRecords = records.filter((el) => el._id !== id);
                setRecords(newRecords);

                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your Item has been deleted from the Cart!.',
                    'success'
                )
                //window.location.reload(false);
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Item Saved',
                    'Your Item is Saved in the Card :)',
                    'info'
                )
            }
        })
    }

    const cart =  {
        customerid: localStorage.getItem("cusID"),
        customername: localStorage.getItem("cusFname") + " " + localStorage.getItem("cusLname"),
        cartid: localStorage.getItem("cusCartID"),
        placeddate:"",
        totalprice: totalcost,
    }

    async function checkout() {

        const newcus = {
            purchases:Number(localStorage.getItem("cusCurrentpurchases")) + 1,
            payments:Number(localStorage.getItem("cusCurrentpayments")) + totalcost,
        }

        //update customer total purchase and payments
        const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/updatepurchases/${localStorage.getItem("cusID")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newcus),
        });

        const content3 = await response3.json();
        console.log(content3);


        const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
        }).catch((error) => {
            alert(error);
        });

        const content2 = await response2.json();
        console.log(content2);

        window.location.href = "/card";
    }

    

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
                                            View Item
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Quantity
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Remove Item
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordList()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br />
                </div>

                <div className="cartfooter">
                    <div className="col-span-3 oneleftcart">
                        <div className="checkoutsection">
                            <button
                                onClick={checkout}
                                type="button"
                                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 checkbtn">
                                Proceed To Checkout
                            </button>
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
                                                Rs. {total}.00
                                            </td>
                                        </tr>

                                        <tr class="bg-white border-b dark:bg-gray-400 dark:border-gray-700">
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                                Discount :
                                            </th>
                                            <td class="py-4 px-6">
                                                Rs. {discount}
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
                                                Rs. {totalcost}
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