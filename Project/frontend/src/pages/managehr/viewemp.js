import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./hr.css"

const RecordPosition = (props) => (
    <option value={props.record.position}>{props.record.position}</option>
);

export default function ViewEmp() {

    const [records, setRecords] = useState([]);
    const [position, setPosition] = useState("");

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        contact: "",
        email: "",
        totalservices: "",
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee/employee/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/viewallcus");
                return;
            }

            setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/position`);

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

    async function deleteRecord(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will the Delete the Employee Profile!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/employee/delete/${params.id.toString()}`, {
                    method: "DELETE"
                });

                navigate("/viewallemp");

                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'This Employee Profile has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'This Employee Profile is Not Deleted:)',
                    'info'
                )
            }
        })
    }

    function recordList() {
        return records.map((record) => {
            return (
                <RecordPosition
                    record={record}
                    //deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }


    async function setPos(e) {
        e.preventDefault();

        const newpos = {
            position
        }

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee/setposition/${params.id.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newpos),
        })
            .catch(error => {
                window.alert(error);
                return;
            });


        Swal.fire({
            icon: 'success',
            title: 'Successfull',
            text: 'Employee Position Updated',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        }
        )
    }

    return (
        <div>
            <div class="viewcus dark:bg-gray-700 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
                <div class="col-span-3"><img src={form.imgurl} alt="" />
                <br/>
                    <button onClick={() => {
                        deleteRecord(form._id);
                    }}
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >Delete Profile</button>
                </div>

                <div class="emponeviewcard">
                    <p class="text-lg"><b>{form.fname}&#160;{form.lname}</b></p>
                    <br />
                    <p class="text-lg sm">{form.contact} </p>
                    <p class="text-lg sm">Current Position - {form.position} </p>
                    <p class="text-lg sm">{form.email} </p>
                    <p class="text-lg sm">Total&#160;Services&#160;Done&#160;-{form.totalservices} </p>
                    <div className="setposform">
                        <form onSubmit={setPos}>
                            <div>
                                <label for="loan_purpose"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Update Employee Position
                                </label>
                                <select id="loan_purpose"
                                    onChange={(e) => setPosition(e.target.value)}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected="">Choose One</option>
                                    {recordList()}
                                </select>
                            </div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}