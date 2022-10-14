import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import "./Stock.css";

export default function Stockadd() {

    const [itemname, setItemname] = useState("");
    const [unitprice, setUnitprice] = useState("");
    const [itemtype, setItemtype] = useState("");
    const [brand, setBrand] = useState("");
    const [unitstock, setUnitstock] = useState("");
	const [imgurl, setImgurl] = useState("");
    
	// const [isErr, setIsErr] = useState("");

    return (
        <div>
            <div className="stockaddhead">
                <br />
                <center>
                    <h1 className="text-5xl font-extrabold text-grey-400">Add Stock Item</h1>
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

                            const newItem = {
                                itemname,
		                        unitprice,
		                        itemtype,
                                brand,
                                unitstock,
                                imgurl: url,
                            };

                            const response = await fetch(`${BASE_URL}/item/add`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(newItem),
                            }).catch((err) => {
                                window.alert(err);
                                // return;
                            });
                            const content = await response.json();
                            console.log(content);

                            alert("Item Added Successfully");

                            window.location.href = "/stockhome";
                            
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
                                required="" 
                                onChange={(e) => setItemname({ itemname: e.target.value })}
                                />
                        </div>
                        <br />

                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-white ">Unit price</label>
                            <input type="text" id="Unitprice"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="$100"
                                required="" 
                                onChange={(e) => setUnitprice({ unitprice: e.target.value })}
                                />
                        </div>
                        <br />

                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-white ">Item type</label>
                            <input type="text" id="Itemtype"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Phone"
                                required="" 
                                onChange={(e) => setItemtype({ itemtype: e.target.value })}
                                />
                        </div>
                        <br />

                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-white ">Brand name</label>
                            <input type="text" id="bname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Apple"
                                required="" 
                                onChange={(e) => setBrand({ brand: e.target.value })}
                                />
                        </div>
                        <br />
                        <div>
                            <label for="visitors" class="block mb-2 text-sm font-medium text-white ">Item Quantity </label>
                            <input type="text" id="qty"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="2"
                                required=""
                                onChange={(e) => setUnitstock({ unitstock: e.target.value })}
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
                                    }}/>
                            </div>
                        </div>
                        <button type="submit"
                            className="text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Add Details</button>
                    </div>
                </form>
            </div>
        </div>
    )
}