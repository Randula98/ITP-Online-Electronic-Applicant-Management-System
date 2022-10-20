import { View, Text } from 'react-native'
import React from 'react'

export default function addSupplier() {
  const [form, setForm] = useState({
    supplierfname: "",
		supplierlname: "",
		street: "",
		city:  "",
		province: "",
		contactnumber: "",
		email: "",
		imgurl: "",
  });

  const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/position/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ supplierfname: "", supplierlname: "", street: "", city: "", province: "", contactnumber: "", email: "", imgurl: "", });
        navigate("/managesup");
    }
  return (
    <div>
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
                            {/* <!--Create and account--> Add New Supplier */}
                        </h1>

                        <form onSubmit={onSubmit}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">

                                <div>
                                    <br />
                                    <label for="fname"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier's
                                        First
                                        Name</label>
                                    <input type="text" name="fname" id="fname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John" required=""
                                        onChange={(e) => updateForm({supplierfname: e.target.value})}/>
                                </div>

                                <div>
                                    <br />
                                    <label for="lname"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier's
                                        Last
                                        Name</label>
                                    <input type="text" name="lname" id="lname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Black" required=""
                                        onChange={(e) => updateForm({supplierlname: e.target.value})}/>
                                </div>
                                {/* <!--Address--> */}
                                <div>

                                    <label for="address"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>

{/* 
                                    <!--<div className="grid gap-6 mb-6 md:grid-cols-2">--> */}

                                    <div>
                                        <input type="text" name="street" id="street"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Street Name" required=""
                                            onChange={(e) => updateForm({street: e.target.value})}/>
                                    </div>
                                    <br />
                                    <div>
                                        <input type="text" name="city" id="city"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="City Name" required=""
                                            onChange={(e) => updateForm({city: e.target.value})}/>
                                    </div>
                                    <br />
                                    <div>
                                        <input type="text" name="province" id="province"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Province Name" required=""
                                            onChange={(e) => updateForm({province: e.target.value})}/>
                                    </div>
                                    {/* <!--</div>--> */}

                                </div>
                                {/* <!--Contact Number--> */}

                                <div>
                                    <label for="contact number"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact
                                        Number</label>
                                    <input type="text" name="conNum" id="conNum" placeholder="999-9999999"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        onChange={(e) => updateForm({contactnumber: e.target.value})}/>
                                </div>

                                {/* <!--email--> */}
                                <div>
                                    <label for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                    <input type="text" name="conNum" id="conNum" placeholder="abc@gmail.com"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        onChange={(e) => updateForm({email: e.target.value})}/>
                                </div>

                                {/* <!--Image--> */}
                                <div>
                                    <br />
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        for="multiple_files">Upload Your Image</label>
                                    <input
                                        class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="img" type="file" multiple=""
                                        onChange={(e) => updateForm({imgurl: e.target.value})}/>

                                </div>


                            </div>
                            <br />

                            <button type="submit"
                                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add
                                Supplier
                            </button>
                           
                        </form>
                    </div>
                </div>
            </div>


        </section>


    </div>

    </div>
  )
}