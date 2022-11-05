import React, { useState } from "react";
//import { useNavigate } from "react-router";
import { storage } from "../../firebase";
//import { db } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



export default function AddRepair() {


    // const [form, setForm] = useState({
        const [customerid, setcustomerid] = useState("");
        const [employeeid, setemployeeid] = useState("");
        const [repairdate, setrepairdate] = useState("");
        const [itemname, setitemname] = useState("");
        const [repaidescription, setrepaidescription] = useState("");
        const[repairfee, setrepairfee] = useState("");
        const [imgurl, setimgurl] = useState("");
    // });

    //const navigate = useNavigate();

    // These methods will update the state properties.
    // function updateForm(value) {
    //   return setForm((prev) => {
    //     return { ...prev, ...value };
    //   });
    // }

    // This function will handle the submission.
    // async function onSubmit(e) {
    //     e.preventDefault();

    //     // When a post request is sent to the create url, we'll add a new record to the database.
    //     const newPerson = { ...form };

    //     await fetch(`${process.env.REACT_APP_BACKEND_URL}/position/add`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newPerson),
    //     })
    //         .catch(error => {
    //             window.alert(error);
    //             return;
    //         });

    //     setForm({ supplierfname: "", supplierlname: "", street: "", city: "", province: "", contactnumber: "", email: "", imgurl: "" });
    //     navigate("/managesup");
    // }


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
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1
                                    className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Add New Repair Item
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

                                            const adddRepair = {
                                                customerid,
                                                employeeid,
                                                repairdate,
                                                itemname,
                                                repaidescription,
                                                repairfee,
                                                imgurl,
                                                //  rstatus,
                                            };

                                            const response = await fetch(`${BASE_URL}/repair/add`, {
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

                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });

                                }}>

                                    <div class="grid gap-6 mb-6 md:grid-cols-2">

                                        <div>
                                            <br />
                                            <label for="Customer ID"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer ID
                                                </label>
                                            <input type="text" name="cID" id="cID"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="John" required=""
                                                onChange={(e) => setcustomerid({ customerid: e.target.value })} />

                                        </div>

                                        <div>
                                            <br />
                                            <label for="Employee ID"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID
                                                </label>
                                            <input type="text" name="eID" id="eID"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Black" required=""
                                                onChange={(e) => setemployeeid({ employeeid: e.target.value })} />

                                        </div>
                                       
                                        <div>

                                            <label for="Item Name"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>


                                          <div>
                                                <input type="text" name="itemName" id="itemName"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="ex: Kettle" required=""
                                                    onChange={(e) => setitemname({ itemname: e.target.value })} />
                                            </div>
                                            <br />
                                            {/* <div>
                                                <input type="text" name="" id="city"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="City Name" required=""
                                                    onChange={(e) => setCity({ city: e.target.value })} />
                                            </div>
                                            <br />
                                            <div>
                                                <input type="text" name="province" id="province"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Province Name" required=""
                                                    onChange={(e) => setProvince({ province: e.target.value })} />
                                            </div>
                                            {/* <!--</div>--> */}
                                            
                                        </div> 
                                        {/* <!--Contact Number--> */}

                                        <div>
                                            <label for="Repair Date"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair Date
                                                </label>
                                            <input type="date" name="rDate" id="rDate" placeholder="dd-mm-yyyy"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required=""
                                                onChange={(e) => setrepairdate({ repairdate: e.target.value })} />
                                        </div>

                                        {/* <!--email--> */}
                                        <div>
                                            <label for="Repair Discription"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair Description</label>
                                            <textarea name="descr" id="descr" placeholder="XXXXXXXXXXXXXXXXX"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required=""
                                                onChange={(e) => setrepaidescription({ repaidescription: e.target.value })} />
                                        </div>

                                        <div>
                                            <label for="Repair Cost"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair Cost</label>
                                            <textarea name="cost" id="cost" placeholder="Rs. XXXX"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required=""
                                                onChange={(e) => setrepairfee({ repairfee: e.target.value })} />
                                        </div>

                                        {/* <!--Image--> */}
                                        <div>
                                            <br />
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                for="multiple_files">Upload File</label>
                                            <input
                                                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                id="img" type="file" multiple=""
                                                onChange={(e) => {
                                                    setimgurl(e.target.files[0]);
                                                }}
                                                required
                                            />

                                        </div>


                                    </div>
                                    <br />

                                    <button type="submit"
                                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                        Add Repair Details
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>


                </section>


            </div>

        </div>
    );
}