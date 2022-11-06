import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Swal from 'sweetalert2'
import "./Stock.css";

const RecordBrand = (props) => (
    <option value={props.record.bname}>{props.record.bname}</option>
);

const RecordItemType = (props) => (
    <option value={props.record.type}>{props.record.type}</option>
);

export default function StockUpdate() {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);

    const [itemname, setItemname] = useState("");
    const [unitprice, setUnitprice] = useState("");
    const [itemtype, setItemtype] = useState("");
    const [brand, setBrand] = useState("");
    const [unitstock, setUnitstock] = useState("");
    const [imgurl, setImgurl] = useState("");
    const [description, setDescription] = useState("");

    const [records3, setRecords3] = useState([]);

    const [form, setForm] = useState({
        itemname: "",
        unitprice: "",
        itemtype: "",
        brand: "",
        unitstock: "",
        imgurl: "",
        description: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {

            const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
            const id = params.id.toString();
            const response = await fetch(`${BASE_URL}/item/item/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                //navigate("/");
                return;
            }

            setItemname(record.itemname);
            setUnitprice(record.unitprice);
            setItemtype(record.itemtype);
            setBrand(record.brand);
            setUnitstock(record.unitstock);
            setImgurl(record.imgurl);
            setDescription(record.description);

            setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/brand`);

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

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords2() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/itemtype`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records2 = await response.json();
            setRecords2(records2);
        }
        getRecords2();

        return;
    }, [records2.length]);

    function recordList() {
        return records.map((record) => {
            return (
                <RecordBrand
                    record={record}
                    //deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function recordList2() {
        return records2.map((record) => {
            return (
                <RecordItemType
                    record={record}
                    //deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div>
            <div className="stockaddhead">
                <center>
                    <h1 className="text-5xl font-extrabold text-grey-400">Update Stock Item</h1>
                </center>
                <br />
                <br />
                <form className="frame"
                    autocomplete="off"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

                        const storageRef = ref(storage, `itemstock/${Image.name + v4()}`);

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

                                const editedItem = {
                                    itemname,
                                    unitprice,
                                    itemtype,
                                    brand,
                                    unitstock,
                                    imgurl: url,
                                    description,
                                };

                                const response = await fetch(`${BASE_URL}/item/update/${params.id}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(editedItem),
                                }).catch((err) => {
                                    window.alert(err);
                                    // return;
                                });
                                const content = await response.json();
                                console.log(content);

                                Swal.fire(
                                    'Success!',
                                    'Item Details are Updated Succesfully!',
                                    'success'
                                )

                                navigate("/stockhome");

                                // if(content.success === true){
                                //     alert("User Registered Successfully");
                                //     window.location.href = "/login/cuslogin";
                                // }
                                // else if (content.found === "email") {
                                //     alert("Email already exist");
                                // }
                                // else if (content.found === "contact") {
                                //     alert("Contact Number already exist");
                                // }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                >
                    <div className="mb-6">
                        <div>
                            <label for="Item Name" class="block mb-2 text-sm font-medium text-white ">Item
                                Name</label>
                            <input type="text" id="iname"
                                className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="iPhone"
                                onChange={(e) => setItemname(e.target.value)}
                                defaultValue={form.itemname}
                                required
                            />
                        </div>
                        <br />

                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-white ">Unit price (In Rupees)</label>
                            <input type="text" id="Unitprice"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="10000"
                                defaultValue={form.unitprice}
                                onChange={(e) => setUnitprice(e.target.value)}
                                required
                            />
                        </div>
                        <br />

                        <div>
                            <label for="loan_purpose"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                Select Item Type
                            </label>
                            <select id="loan_purpose"
                                onChange={(e) => setItemtype(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={form.itemtype}>{form.itemtype}</option>
                                {recordList2()}
                            </select>
                        </div>

                        <br />

                        <div>
                            <label for="loan_purpose"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                Select Brand
                            </label>
                            <select id="loan_purpose"
                                onChange={(e) => setBrand(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected="" value={form.brand}>{form.brand}</option>
                                {recordList()}
                            </select>
                        </div>

                        <br />
                        <div>
                            <label for="visitors" class="block mb-2 text-sm font-medium text-white ">Item Quantity </label>
                            <input type="text" id="qty"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="2"
                                defaultValue={form.unitstock}
                                onChange={(e) => setUnitstock(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div className="mb-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white" for="multiple_files">Item Image </label>
                                <input
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="itemimg" type="file"
                                    multiple=""
                                    onChange={(e) => {
                                        setImgurl(e.target.files[0]);
                                    }} />
                            </div>
                        </div>
                        <div>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Item Description (Press Enter for a newline)</label>
                            <textarea
                                id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" Color
                                Specifications
                                Performance
                                "
                                defaultValue={form.description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <br />
                        <button type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update Details
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
}