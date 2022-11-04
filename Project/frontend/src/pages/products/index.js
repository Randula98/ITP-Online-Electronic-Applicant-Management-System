import React, { useEffect, useState } from "react";
import './product.css'

const ItemTypeList = (props) => (
	<a href={`/typeitemview/${props.record.type}`} class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 itemtype">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.record.type}</h5>
		<a href={`/typeitemview/${props.record.type}`}><button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Items</button></a>
	</a>
)

export default function Prooducts() {

	const [records, setRecords] = useState([]);

	// This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/itemtype/`);

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
                <ItemTypeList
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
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
					<span class="font-medium"><b>Select your desired Item Type ♥♥</b></span>
				</div>
			</div>

			<div className="itemtypelist">
				{recordList()}
			</div>
		</div>

	);
}

