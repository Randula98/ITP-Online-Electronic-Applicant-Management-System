// import { async } from "@firebase/util";
import React from "react";

export default function Cuslogin() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	async function cusLogin(event) {
		event.preventDefault();
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const content = await response.json();
		console.log(content);

		if (content.user === true) {
			alert("Login Success");
			localStorage.setItem("session", "yes");
			localStorage.setItem("cusID", response._id);
			localStorage.setItem("cusFname", response.fname);
			localStorage.setItem("cusLname", response.lname);
			localStorage.setItem("cusAddress", response.address);
			localStorage.setItem("cusContactno", response.contactno);
			localStorage.setItem("cusEmail", response.email);
			localStorage.setItem("cusPassword", response.password);
			localStorage.setItem("cusTotalpurchases", response.totalpurchases);
			localStorage.setItem("cusTotalpayments", response.totalpayments);
			localStorage.setItem("cusImgurl", response.imgurl);
			localStorage.setItem("authToken", response.token);
			localStorage.setItem("user", "CUSTOMER");
			console.log(localStorage.getItem("session"));
			console.log(localStorage.getItem("user"));
			window.location.href = "/cusdash";
		} else {
			alert("Login Failed");
		}
	}

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<div className="logincredcard">
				<section className="bg-gray-50 dark:bg-gray-900 glass glasscus">
					<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
						<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
							<b>Login As A Customer</b>
						</a>
						<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 card">
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Sign in to your account
								</h1>
								<form className="space-y-4 md:space-y-6" onSubmit={cusLogin}>
									<div>
										<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Your email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@mail.com"
											onChange={(event) => setEmail(event.target.value)}
											required
										/>
									</div>
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
											onChange={(event) => setPassword(event.target.value)}
											required
										/>
									</div>
									<button
										type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									>
										Sign in
									</button>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400 dark:text-black">
										Don’t have an account yet?{" "}
										<a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
											Sign up
										</a>
									</p>
								</form>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400 dark:text-black">
									Don’t have an account yet?{" "}
									<a href="/empdash" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
										Bypass
									</a>
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
