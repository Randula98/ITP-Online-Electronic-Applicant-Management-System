
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import "./page.css";

export default function SetPromotionUpdate() {

    const [promoname, setPromoname] = useState("");
    const [precentage, setPrecentage] = useState("");
    const [promoprice, setPromoprice] = useState("");
    const [imgurl, setImgurl] = useState("");
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");

    const [form , setForm] = useState({
       promoname:"",
       precentage:"",
       promoprice:"",
       imgurl:"",
       startdate:"",
       enddate:"", 
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {

			const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
            const id = params.id.toString();
            const response = await fetch(`${BASE_URL}/promotion/getRecordByID/${params.id.toString()}`);

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

            // setFname(record.fname);
			// setLname(record.lname);
			// setAddress(record.address);
			// setContactno(record.contactno);
			// setEmail(record.email);

            setPromoname(record.promoname);
            setPrecentage(record.precentage);
            setPromoprice(record.promoprice)
            setStartdate(record.startdate)
            setEnddate(record.enddate)
            
			setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    async function onSubmit(e) {
        e.preventDefault();

        const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

        const storageRef = ref(storage, `promotiona/${Image.name + v4()}`);

        await uploadBytes(storageRef, imgurl)
            .then(() => {
                console.log("uploaded");
            })
            .catch((err) => {
                console.log(err);
            });

        await getDownloadURL(storageRef)
            .then(async (url) => {
                setImgurl(url);

                console.log(url);

                const newPromos = {
                    promoname,
                    precentage,
                    promoprice,
                    imgurl: url,
                    startdate,
                    enddate
                };

                const response = await fetch(`${BASE_URL}/promotion/update/${params.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPromos),
                }).catch((err) => {
                    window.alert(err);
                    // return;
                });
                const content = await response.json();
                console.log(content);


                if (content.success === true) {
                    alert("User updated Successfully");
                    window.location.href = "/managesales";
                }
                else if (content.found === "email") {
                    alert("Email already exist");
                }
                else if (content.found === "contact") {
                    alert("Contact Number already exist");
                }

                alert("Promotion Update Successfully");
                window.location.href = "/managesales";
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (

        <div className="f1">
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
                                Update Promotion Details
                            </h1>
                            <form className="space-y-4 md:space-y-6" autocomplete="off"
                                onSubmit={onSubmit}>

                                <div>
                                    <label for="percentage"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promotion Name</label>
                                    <input type="text" name="percentage" id="percentage"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Laptop On Sale"
                                        onChange={(e) => setPromoname(e.target.value)}
                                        defaultValue={form.promoname}
                                        required
                                    />
                                </div>

                                <div>
                                    <label for="percentage"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promotion Price</label>
                                    <input type="text" name="percentage" id="percentage"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="130000"
                                        onChange={(e) => setPromoprice(e.target.value)} 
                                        defaultValue={form.promoprice}
                                        required />
                                </div>

                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="confirm-password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Upload Promotion Image
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="confirm-password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-red-600"
                                        >
                                            {/* {isErr} */}
                                        </label>
                                    </div>
                                </div>
                                {/* image */}
                                <div>
                                    <div>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            id="default_size"
                                            type="file"
                                            name="image"
                                            defaultValue={form.imgurl}
                                            onChange={(e) => {
												setImgurl(e.target.files[0]);
											}}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label for="percentage"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                                    <input type="text" name="percentage" id="percentage"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="20%" 
                                        onChange={(e) => setPrecentage(e.target.value)}
                                        defaultValue={form.precentage} 
                                        required/>
                                </div>

                                <div>
                                    <label for="percentage"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date and End date</label>
                                    <div date-rangepicker="" className="flex items-center">

                                        <div className="relative">
                                            <div
                                                className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input name="start" type="date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                                                placeholder="Select date start" 
                                                onChange={(e) => setStartdate(e.target.value)}
                                                defaultValue={form.startdate} 
                                                required
                                                />
                                        </div>
                                        <span className="mx-4 text-gray-500">to</span>
                                        <div className="relative">
                                            <div
                                                className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input name="end" type="date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                                                placeholder="Select date end" 
                                                onChange={(e) => setEnddate(e.target.value)}
                                                defaultValue={form.enddate} 
                                                required/>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex items-start">


                                </div>
                                <button type="submit"
                                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}