import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./serdash.css"

export default function ViewDel() {

    const [form, setForm] = useState({
        customerid: "",
        repairdate: "",
        itemname: "",
        description: "",
        imgurl: "",
        status: "",
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
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will lose the Repair Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/delete/${id}`, {
                    method: "DELETE"
                });

                navigate("/manageservice/viewallrep");
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Repair Details has been deleted.',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Repair Details Not Deleted:)',
                    'info'
                )
            }
        })
    }

    return (
        <div>
            <div className="viewcus dark:bg-gray-700 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
                <div className="col-span-3"><img src={form.imgurl} alt="" />
                    <a href={`/manageservice/updaterep/${form._id}`}>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Update Details</button></a>
                    <button onClick={() => {
                        deleteRecord(form._id);
                    }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >Delete Details</button>
                </div>

                <div className="repitemcard">
                    <div className="repitemcardtext">
                        <ul>
                            <li><p className="text-lg sm">Item Name - {form.itemname} </p></li>
                            <li><p className="text-lg sm">Last Modification - {form.repairdate} </p></li>
                            <li><p className="text-lg sm">Status - {form.status} </p></li>
                            <li><p className="text-lg sm">Description <br /><br />{form.description} </p></li>
                        </ul>

                    </div>


                    <a href={`/viewcus/${form.customerid}`}>
                        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            View Customer Profile
                        </button>
                    </a>
                </div>



            </div>
        </div>
    )
}