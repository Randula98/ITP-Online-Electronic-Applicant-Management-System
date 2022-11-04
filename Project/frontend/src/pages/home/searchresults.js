import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecordItems = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandcard itemcardview">
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
            <a href={`/oneitemview/${props.record._id}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">Rs. {props.record.unitprice}.00
                </h5>
            </a>
            <a href={`/oneitemview/${props.record._id}`}>
                <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    View Item</button>
            </a>
        </div>
    </div>
);

export default function SearchResults() {

    const [records, setRecords] = useState([]);

    const params = useParams();
    const key = params.key.toString();

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/search/${key}`);

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
            <br /><br /><br /><br />
            <h2>Search Results For "{key}"</h2>
            <div className="brandcarditems">
                {recordList()}

            </div>
        </div>
    )
}