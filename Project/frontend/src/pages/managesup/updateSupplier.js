/* eslint-disable object-shorthand */
import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Swal from 'sweetalert2'

export default function UpdateSupplier() {
  // const [imageUpload, setImageUpload] = useState(null);
  // const [imageList , setImageList] = useState([]);

  const [supplierfname, setSupplierfname] = useState("");
  const [supplierlname, setSupplierlname] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [email, setEmail] = useState("");
  const [imgurl, setImgurl] = useState("");
  // const navigate = useNavigate();

  const [form, setForm] = useState({
    supplierfname: "",
    supplierlname: "",
    street: "",
    city: "",
    province: "",
    contactnumber: "",
    email: "",
    imgurl: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {

      const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
      const id = params.id.toString();
      const response = await fetch(`${BASE_URL}/supplier/supplier/${params.id.toString()}`)

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

      setSupplierfname(record.supplierfname);
      setSupplierlname(record.supplierlname);
      setStreet(record.street);
      setCity(record.city);
      setProvince(record.province);
      setContactnumber(record.contactnumber);
      setEmail(record.email);

      setForm(record);
    }
    fetchData();

    return;
  }, [params.id, navigate]);

  return (
    <div>
      <div class="f1">
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <br />
            <br />
            <br />
            <br />
            <br />

            <div
              class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y- md:space-y-6 sm:p-8">
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Update Supplier Details
                </h1>

                <form

                  className="space-y-4 md:space-y-6"
                  autoComplete="off"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

                    console.log(imgurl.name == null);

                    if (street === "") { console.log("street is empty"); }
                    if (city === "") { console.log("city is empty"); }
                    if (province === "") { console.log("province is empty"); }

                    const storageRef = ref(storage, `supplier/${Image.name + v4()}`);

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

                        console.log("url " + url);

                        console.log("imgurl " + imgurl + " end");

                        if (Image.name == null) {
                          setImgurl(localStorage.getItem("imgurl"));
                        }


                        if (imgurl === " ") {
                          console.log("imgurl is null");
                          setImgurl(localStorage.getItem("imgurl"));
                        }

                        const editedCustomer = {
                          supplierfname,
                          supplierlname,
                          street,
                          city,
                          province,
                          contactnumber,
                          email,
                          imgurl: url,
                        };

                        console.log("Image : " + imgurl);

                        const response = await fetch(`${BASE_URL}/supplier/update/${params.id}`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(editedCustomer),
                        }).catch((err) => {
                          window.alert(err);
                          // return;
                        });
                        const content = await response.json();
                        console.log(content);

                        // localStorage.setItem("supFname", supplierfname);
                        // localStorage.setItem("supLname", supplierlname);
                        // localStorage.setItem("supStreet", street);
                        // localStorage.setItem("supCity", city);
                        // localStorage.setItem("supContactnumber", contactnumber);
                        // localStorage.setItem("supEmail", email);
                        // localStorage.setItem("supImgurl", url);

                        Swal.fire(
                          'Updated !',
                          'Supplier Profile Update Successfully !',
                          'success'
                        )
                        navigate("/viewallsup");

                        // if(content.success === true){
                        // 	alert("Profile Updates Successfully");
                        // 	window.location.href = "/viewallsup";
                        // }
                        // else if (content.found === "email") {
                        // 	alert("Email already exist");
                        // 	window.location.href = "/viewallsup";
                        // }
                        // else if (content.found === "contact") {
                        // 	alert("Contact Number already exist");
                        // 	window.location.href = "/viewallsup";
                        // }
                        // alert("Profile Updates Successfully");
                        // window.location.href = "/viewallsup";

                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <div class="grid gap-6 mb-6 md:grid-cols-2">

                    <div>
                      <br />
                      <label for="fname"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier's
                        First
                        Name</label>
                      <input type="text" name="fname" id="fname"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required
                        onChange={(e) => setSupplierfname( e.target.value )} 
                        defaultValue={form.supplierfname}/>

                    </div>

                    <div>
                      <br />
                      <label for="lname"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier's
                        Last
                        Name</label>
                      <input type="text" name="lname" id="lname"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Black" required
                        onChange={(e) => setSupplierlname(e.target.value )} 
                        defaultValue={form.supplierlname}/>

                    </div>
                    {/* <!--Address--> */}
                    <div>

                      <label for="address"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>


                      {/* <!--<div class="grid gap-6 mb-6 md:grid-cols-2">--> */}

                      <div>
                        <input type="text" name="street" id="street"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Street Name" required
                          onChange={(e) => setStreet(e.target.value )} 
                          defaultValue={form.street}/>
                      </div>
                      <br />
                      <div>
                        <input type="text" name="city" id="city"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="City Name" required
                          onChange={(e) => setCity(e.target.value )} 
                          defaultValue={form.city}/>
                      </div>
                      <br />
                      <div>
                        <input type="text" name="province" id="province"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Province Name" required
                          onChange={(e) => setProvince(e.target.value )} 
                          defaultValue={form.province}/>
                      </div>
                      {/* <!--</div>--> */}

                    </div>
                    {/* <!--Contact Number--> */}

                    <div>
                      <label for="contact number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact
                        Number</label>
                      <input type="text" name="conNum" id="conNum" placeholder="999-9999999"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => setContactnumber(e.target.value )} 
                        defaultValue={form.contactnumber}/>
                    </div>

                    {/* <!--email--> */}
                    <div>
                      <label for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                      <input type="email" name="conNum" id="conNum" placeholder="abc@gmail.com"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => setEmail(e.target.value )} 
                        defaultValue={form.email}/>
                    </div>

                    {/* <!--Image--> */}
                    <div>
                      <br />
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        for="multiple_files">Upload Your Image</label>
                      <input
                        class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="img" type="file" multiple=""
                        onChange={(e) => {
                          setImgurl(e.target.files[0]);
                        }}
                        required
                      />

                    </div>


                  </div>
                  <br />

                  <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update
                    Details
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
