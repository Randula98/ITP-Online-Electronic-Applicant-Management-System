import React, { useState } from "react";
//import { useNavigate } from "react-router";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


export default function AddRepair() {

  const [customerid, setcustomerid] = useState("");
  const [employeeid, setemployeeid] = useState("");
  const [repairdate, setrepairdate] = useState("");
  const [itemname, setitemname] = useState("");
  const [repaidescription, setrepaidescription] = useState("");
  // const[repairfee, setrepairfee] = useState("");
  const [imgurl, setimgurl] = useState("");
  // const[rstatus, setrstatus] = useState("");


  // const [form, setForm] = useState({
  //   customerid: "",
  //   employeeid: "",
  //   repairdate: "",
  //   itemname: "",
  //   repaidescription: "",
  //   repairfee: "",
  //   imgurl: "",
  //   rstatus: "",
  // });
  // const navigate = useNavigate();

  // These methods will update the state properties.
  // function updateForm(value) {
  //   return setForm((prev) => {
  //     return { ...prev, ...value };
  //   });
  // }

  // This function will handle the submission.
  // async function onSubmit(e) {
  //   e.preventDefault();

  //   // When a post request is sent to the create url, we'll add a new record to the database.
  //   const newPerson = { ...form };

  //   await fetch("http://localhost:5000/record/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newPerson),
  //   })
  //     .catch(error => {
  //       window.alert(error);
  //       return;
  //     });

  //   setForm({ customerid: "", employeeid: "", repairdate: "", itemname: "", repaidescription: "", repairfee: "", imgurl: "", rstatus: "", });
  //   navigate("/manageservice");
  // }



  return (
    <div>
      <div className="f2" />
      <section className="bg-gray-800 dark:bg-gray-900" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <br />
        <br />
        <br />
        <br />
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Repair Details
            </h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
                const storageRef = ref(storage, `seervice/${Image.name + v4()}`);

                await uploadBytes(storageRef, imgurl)
                  .then(() => {
                    console.log("Uploaded a file!");
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                await getDownloadURL(storageRef)
                  .then(async (url) => {
                    setimgurl(url);
                    console.log(url);

                    const addRepair = {
                      customerid,
                      employeeid,
                      repairdate,
                      itemname,
                      repaidescription,
                      // repairfee,
                      imgurl,
                      //  rstatus,
                    };

                    const response = await fetch(`${BASE_URL}/service/add`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(addRepair),
                    }).catch((err) => {
                      Window.alert(err);
                      //return;
                    });
                    const content = await response.json();
                    console.log(content);

                    if (response.status === true) {
                      alert("Repair Added Successfully");
                      window.location.href = "/manageservice";
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                {/* <!--<div>
                                    <label for="Repair ID"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair
                                        ID</label>
                                    <input type="text" name="rID" id="rID"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Repair ID" required="" 
                                        />
                                </div> --> */}
                <div>
                  <label for="Customer ID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer
                    ID</label>
                  <input type="text" name="cID" id="cID" placeholder="Enter Customer ID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setcustomerid({ customerid: e.target.value })} />

                </div>

                <div>
                  <label for="Emplyee ID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID
                  </label>
                  <input type="text" name="eID" id="eID" placeholder="Enter Employee ID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setemployeeid({ employeeid: e.target.value })} />

                </div>

                <div>
                  <label for="Item Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item name
                  </label>
                  <input type="text" name="itemName" id="itemName" placeholder="Enter Item Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setitemname({ itemname: e.target.value })} />

                </div>

                <div>
                  <label for="Repair Date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair Date
                  </label>
                  <input type="date" name="rdate" id="rdate" placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setrepairdate({ repairdate: e.target.value })} />

                </div>



                <div>
                  <label for="Repair Description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repair
                    Description
                  </label>

                  <textarea id="description" name="description" rows="4" placeholder="Description..."
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setrepaidescription({ repaidescription: e.target.value })} >
                  </textarea>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="file_input">Upload file</label>
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input" type="file"
                    multiple=""
                    onChange={(e) => {
                      setimgurl({ imgurl: e.target.files[0] });
                    }}
                    required
                  />
                </div>

              </div>

              <button type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Submit</button>


            </form>
          </div>
        </div>
      </div>

      <section />
    </div >
  );

}