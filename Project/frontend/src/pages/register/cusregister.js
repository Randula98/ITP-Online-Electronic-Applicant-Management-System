import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function CusRegister() {
	const [imageUpload, setImageUpload] = useState(null);
	// const [imageList , setImageList] = useState([]);

	const uploadImage = () => {
		if (imageUpload == null) return;

		const imageRef = ref(storage, `customer/${imageUpload.name + v4()}`);

		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			console.log("Uploaded a blob or file!");
			alert("Image Uploaded Successfully");
			getDownloadURL(imageRef).then((url) => {
				console.log(url);
				alert(url);
				// const imageurl = url;
			});
		});
	};

	// const imageRef = null;

	// useEffect(() => {
	// 	listAll(imageRef).then((response) =>{
	// 		setImageList(response.items);
	// 	});
	// }, []);

	const [form, setForm] = useState({
		fname: "",
		lname: "",
		address: "",
		contactno: "",
		email: "",
		password: "",
		totalpurchases: "0",
		totalpayments: "0",
		imgurl: "",
	});

	const navigate = useNavigate();

	function updateFrom(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function onSubmit(e) {
		e.preventDefault();

		const newCustomer = { ...form };

		await fetch("http://localhost:5001/customer/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCustomer),
		}).catch((err) => {
			window.alert(err);
			// return;
		});

		console.log("newCustomer");
		alert("User Registered Successfully");

		setForm({
			fname: "",
			lname: "",
			address: "",
			contactno: "",
			email: "",
			password: "",
			totalpurchases: "0",
			totalpayments: "0",
			imgurl: "",
		});
		navigate("/login/cuslogin");
	}

	return (
		<div className="cusreg">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<section className="bg-gray-50 dark: cusregsec">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 cusregcard">
					<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white regtext">
						<img className="w-10 h-10 mr-2 regimg" src="https://i.ibb.co/dKgfxZQ/cus.png" alt="logo" />
						<h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
							<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
								Register As A Customer
							</span>
						</h1>
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-l xl:p-0 dark:bg-gray-800 dark:border-gray-700 cusregform">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create and account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
								{/* name  */}
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											First name
										</label>
										<input
											type="text"
											id="fname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="John"
											value={form.fname}
											onChange={(e) => updateFrom({ fname: e.target.value })}
											required
										/>
									</div>
									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Last name
										</label>
										<input
											type="text"
											id="lname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Doe"
											value={form.lname}
											onChange={(e) => updateFrom({ lname: e.target.value })}
											required
										/>
									</div>
								</div>
								{/* address name */}
								<div>
									<label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Address
									</label>
									<input
										type="text"
										name="adddress"
										id="address"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="No. 134, Main Road, Colombo"
										value={form.address}
										onChange={(e) => updateFrom({ address: e.target.value })}
										required
									/>
								</div>
								{/* contactno */}
								<div>
									<label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Contact No
									</label>
									<input
										type="text"
										name="contactno"
										id="contactno"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="011-2364567"
										value={form.contactno}
										onChange={(e) => updateFrom({ contactno: e.target.value })}
										required
									/>
								</div>
								{/* email */}
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Email Address
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@mail.com"
										value={form.email}
										onChange={(e) => updateFrom({ email: e.target.value })}
										required
									/>
								</div>
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									{/* password */}
									<div>
										<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(e) => updateFrom({ password: e.target.value })}
											required
										/>
									</div>
									{/* confirm password */}
									<div>
										<label
											htmlFor="confirm-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Confirm password
										</label>
										<input
											type="confirm-password"
											name="confirm-password"
											id="confirm-password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											// required
										/>
									</div>
								</div>
								{/* image */}

								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
											htmlFor="default_size"
										>
											Default size
										</label>
										<input
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											id="default_size"
											type="file"
											name="image"
											onChange={(event) => {
												setImageUpload(event.target.files[0]);
											}}
										/>
									</div>
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											// required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
											I accept the{" "}
											<a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									onClick={uploadImage}
								>
									Create an account
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
										Login here
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
