import React, { useState } from "react";
// import { useNavigate } from "react-router";
import "./card.css";

const RecordCard = (props) => (
    <option value={props.record.bname}>{props.record.bname}</option>
);


export default function CardAdd() {

    // const [records, setRecords] = useState([]);

    // const [cardnumber, setCardnumber] = useState("");
    // const [cvc, setCvc] = useState("");
    // const [expdate, setExpdate] = useState("");


    // // This method fetches the records from the database.
    // useEffect(() => {
    //     async function getRecords() {
    //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/card`);

    //         if (!response.ok) {
    //             const message = `An error occurred: ${response.statusText}`;
    //             window.alert(message);
    //             return;
    //         }
    //         const records = await response.json();
    //         setRecords(records);
    //     }
    //     getRecords();

    //     return;
    // }, [records.length]);

    // function recordList() {
    //     return records.map((record) => {
    //         return (
    //             <RecordCard
    //                 record={record}
    //                 //deleteRecord={() => deleteRecord(record._id)}
    //                 key={record._id}
    //             />
    //         );
    //     });
    // }


    return (
        <div>
            <div className="cardaddhead">
                <br />
                <center>
                    <h1 className="text-5xl font-extrabold text-grey-400">Add Credit\Debit Card</h1>
                </center>
                <br />
                <br />
                <form className="frame"
                    autocomplete="off"
                >
                    <div className="mb-6">
                        <div>
                            <label for="Card Number" class="block mb-2 text-sm font-medium text-white ">Card Number</label>
                            <input type="text" id="inumber"
                                className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="6614 1234 5678 9012"
                                required=""
                                // onChange={(e) => setCardnumber({ cardnumber: e.target.value })}
                            />
                        </div>
                        <br />

                        <div>
                            <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">CVC</label>
                            <input type="text" id="cvc"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="123"
                                required=""
                                // onChange={(e) => setCvc({ cvc: e.target.value })}
                            />
                        </div>
                        <br />

                        <div>
                            <label for="Expiry Date" class="block mb-2 text-sm font-medium text-white ">Expiry Date</label>
                            <input type="date" id="expdate"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="12/2021"
                                required=""
                                // onChange={(e) => setExpdate({ cvc: e.target.value })}
                            />
                        </div>
                        <br />

                        <button type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Details</button>
                    </div>
                </form>
            </div>
        </div>
    )
}