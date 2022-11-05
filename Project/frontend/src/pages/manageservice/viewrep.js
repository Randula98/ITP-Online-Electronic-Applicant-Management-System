import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./serdash.css"

export default function ViewDel() {

    const [form, setForm] = useState({
        customerid: "",
        employeeid: "",
        repairdate: "",
        itemname: "",
        repaidescription: "",
        repairfee: "",
        imgurl: "",
        rstatus: "",

    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/repair/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/viewalldeliveries");
                return;
            }

            setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/delete/${id}`, {
            method: "DELETE"
        });

        navigate("/viewalldeliveries");
    }

    // This method will delete a record
    // async function deleteRecord(id) {
    //     await fetch(`http://localhost:5000/${id}`, {
    //         method: "DELETE"
    //     });

    //     const newRecords = records.filter((el) => el._id !== id);
    //     setRecords(newRecords);
    // }

    // This method will map out the records on the table
    // function recordList() {
    //   return records.map((record) => {
    //     return (
    //       <ViewCusTag
    //         record={record}
    //         // deleteRecord={() => deleteRecord(record._id)}
    //         key={record._id}
    //       />
    //     );
    //   });
    // }
    return (
        <div>
            <div className="viewcus dark:bg-gray-700 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
                <div className="col-span-3"><img src={form.imgurl} alt="" />
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Details</button>
                    <button onClick={() => {
                        deleteRecord(form._id);
                    }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >Delete Details</button>
                </div>

                <div className="">
                    <p className="text-lg sm">{form.itemname} </p>
                    <p className="text-lg"><b>{form.customerid}</b></p>
                    <br />
                    <p className="text-lg"><b>{form.employeeid}</b></p>
                    <p className="text-lg sm">{form.repairdate} </p>
                    <p className="text-lg sm">{form.repaidescription} </p>
                    <p className="text-lg sm">{form.repairfee} </p>
                    <p className="text-lg sm">{form.imgurl} </p>
                    <p className="text-lg sm">{form.rstatus} </p>

                </div>


            </div>
        </div>
    )
}