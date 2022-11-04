import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecordItems = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandcard itemcardview itemtypeitem">
        <div className="brandcardimg">
            <a href={`/oneitemview/${props.record._id}`}>
                <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
            </a>
        </div>
        <div className="p-5">
            <a href={`/oneitemview/${props.record._id}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.itemname}
                </h5>
            </a>

            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-gray-700">Rs.{props.record.unitprice}
            </h5>
            <a href={`/oneitemview/${props.record._id}`}>
                <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    View Item</button>
            </a>

        </div>
    </div>
);

export default function BrandViewItems() {

    const [records, setRecords] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/brand/${params.key}`);

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

    // This method will delete a record
    // async function deleteRecord(id) {
    //   await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/delete/${id}`, {
    //     method: "DELETE"
    //   });

    //   const newRecords = records.filter((el) => el._id !== id);
    //   setRecords(newRecords);
    // }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordItems
                    record={record}
                    //deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <div className="producthead">
                <div class="p-4 mb-4 text-m text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                    <span class="font-medium"><b>Select The Item You Want ♥♥</b></span>
                </div>
            </div>

            <div className="brandcarditems">
                {recordList()}

            </div>

        </div>
    )
}