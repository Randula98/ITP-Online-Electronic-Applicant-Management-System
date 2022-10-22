import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import "./brand.css";
export default function AddBrand() {

  const [bname, setBname] = useState("");
  const [brandimg, setBrandimg] = useState("");

  return (
    <div>
      <center>
        <h1 class="text-5xl font-extrabold text-white ">Add Brand</h1>
      </center>
      <br />
      <br />
      <form class="frame" onSubmit={async (e) => {
									e.preventDefault();

									const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

									const storageRef = ref(storage, `brand/${Image.name + v4()}`);

									await uploadBytes(storageRef, brandimg)
										.then(() => {
											console.log("uploaded");
										})
										.catch((err) => {
											console.log(err);
										});

									await getDownloadURL(storageRef)
										.then(async (url) => {
											setBrandimg(url);

											console.log(url);

											const newBrand = {
												bname,
												brandurl: url,
											};

											const response = await fetch(`${BASE_URL}/brand/add`, {
												method: "POST",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify(newBrand),
											}).catch((err) => {
												window.alert(err);
												// return;
											});
											const content = await response.json();
											console.log(content);

											
											if(content.success === true){
												alert("User Registered Successfully");
												window.location.href = "/login/cuslogin";
											}
											else if (content.found === "email") {
												alert("Email already exist");
											}
											else if (content.found === "contact") {
												alert("Contact Number already exist");
											}
										})
										.catch((err) => {
											console.log(err);
										});					

                    alert("New Brand Registered Successfully");
										window.location.href = "/brandview";
								}}
                >
        <div class="mb-6">
          <div>
            <label for="Item Name" class="block mb-2 text-sm font-medium text-white ">Brand
              Name</label>
            <input type="text" id="bname"
              class="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="iPhone" 
              onChange={(e) => setBname(e.target.value )}
              required
               />
          </div>
        </div>
        <br />

        <div class="mb-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-white" for="multiple_files">Item Image </label>
            <input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="default_size"
							type="file"
							name="image"
							onChange={(e) => {
                setBrandimg(e.target.files[0]);
								}}
							required
										/>
          </div>

        </div>
        <center>
          <button type="submit"
            class="text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Add Details</button>
        </center>
      </form>

    </div>
  )
}