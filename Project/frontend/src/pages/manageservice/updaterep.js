/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
//import { db } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Swal from 'sweetalert2'
import './serv.css'

export default function UpdateRep() {

    const params = useParams();
    const navigate = useNavigate();

    const [itemname, setitemname] = useState("");
    const [description, setdescription] = useState("");
    const [imgurl, setimgurl] = useState("");

    const [form , setForm] = useState({
        itemname: "",
        description: "",
        imgurl: ""
    })

    useEffect(() => {
        async function fetchData() {
    
          const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
          const id = params.id.toString();
          const response = await fetch(`${BASE_URL}/repair/repair/${params.id.toString()}`)
    
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const record = await response.json();
          if (!record) {
            window.alert(`Record with id ${id} not found`);
            navigate("/");
            return;
          }
    
          setdescription(record.description);
        setitemname(record.itemname);
    
          setForm(record);
        }
        fetchData();
    
        return;
      }, [params.id, navigate]);

    return (
        <div>
            <div class="f1">
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-l xl:p-0 dark:bg-gray-600 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1
                                    className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Update New Service / Repair Details
                                </h1>

                                <form onSubmit={async (e) => {

                                    e.preventDefault();

                                    const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
                                    const storageRef = ref(storage, `service/${Image.name + v4()}`);

                                    await uploadBytes(storageRef, imgurl)
                                        .then(() => {
                                            console.log("Uploaded a file!");
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });

                                    await getDownloadURL(storageRef)
                                        .then(async (url) => {
                                            setimgurl(url);
                                            console.log(url);
                                            const cid = localStorage.getItem("cusID");

                                            const adddRepair = {
                                                itemname,
                                                description,
                                                imgurl: url,
                                            };

                                            const response = await fetch(`${BASE_URL}/repair/update/${params.id}`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },

                                                body: JSON.stringify(adddRepair),
                                            }).catch((err) => {
                                                window.alert(err);

                                            });

                                            const content = await response.json();
                                            console.log(content);

                                            if (response.status === true) {
                                                alert("Supplier Added Successfully");
                                                window.location.href = "/managesup";
                                            }
                                            else if (content.found === "email") {
                                                alert("Email already exists");
                                            }
                                            else if (content.found === "contactnumber") {
                                                alert("Contact Number already exists");
                                            }

                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Successfully Updated',
                                                text: 'Your Servie / Repair Item has been Updated successfully!',
                                                footer: '<a href="/">Go To Home</a>'
                                            })
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                    navigate("/manageservice/viewallrep");

                                }}>

                                    <div class="">
                                        <div class="mb-6">
                                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter Item Name</label>
                                            <input 
                                                defaultValue={itemname}
                                                onChange={(e) => { setitemname(e.target.value) }}
                                                type="text"
                                                id="base-input"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required />
                                        </div>

                                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Service / Repair Description</label>
                                        <textarea
                                            defaultValue={description}
                                            onChange={(e) => { setdescription(e.target.value) }}
                                            id="message"
                                            rows="4"
                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
                                            required></textarea>


                                        <div className="servfile">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload Image</label>
                                            <input
                                                required
                                                onChange={(e) => { setimgurl(e.target.files[0]) }}
                                                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                        </div>

                                        <br />
                                        <button type="submit"
                                            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                            Add Repair Details
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </section>


            </div>

        </div>
    )
}