import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./supplier.css"

export default function ViewSup() {

    const [form, setForm] = useState({
        supplierfname: "",
        supplierlname: "",
        street: "",
        city: "",
        province: "",
        contactnumber: "",
        email: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/supplier/supplier/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/viewallsup");
                return;
            }

            setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/supplier/delete/${id}`, {
            method: "DELETE"
        });

        navigate("/viewallsup");
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
                <a href={`/updateSupplier/${form._id}`} target="_blank">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Supplier Details</button>

                </a>
                    <button onClick={() => {
                        deleteRecord(form._id);
                    }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >Remove Supplier</button>
                </div>

                <div className="">
                    <p className="text-lg"><b>{form.supplierfname}&nbsp;{form.supplierlname}</b></p>
                    <br />
                    <p className="text-lg sm">{form.street} </p>
                    <p className="text-lg sm">{form.city} </p>
                    <p className="text-lg sm">{form.province}&nbsp;Province </p>
                    <p className="text-lg sm">{form.contactnumber} </p>
                    <p className="text-lg sm">{form.email} </p>
                    {/* <p className="text-lg sm">Total&#160;Items&#160;Supplied&#160;-{form.totalpurchases} </p> */}
                    {/* <p className="text-lg sm">Total&#160;Spent&#160;Amount&#160;-{form.totalpayments} </p> */}

                </div>


            </div>
        </div>
    )
}