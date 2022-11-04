import React, { useEffect, useState } from "react";

const RecordAllBrands = (props) => (
	<div
	  className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandcard">
	  <div className="brandcardimg">
		<a href={`/branditemview/${props.record.bname}`} >
		  <img className="rounded-t-lg" src={props.record.brandurl} alt="" />
		</a>
	  </div>
	  <div className="p-5">
		<a href="/">
		  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.bname}
		  </h5>
		</a>
  
	  </div>
	</div>
  );

export default function Brands() {
	
	const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/`);

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
  async function deleteRecord(id) {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand/delete/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <RecordAllBrands
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
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
					<span class="font-medium"><b>Select your desired Brand ♥♥</b></span>
				</div>
			</div>

			<div className="itemtypelist">
				{recordList()}
			</div>
		</div>
	);
}
