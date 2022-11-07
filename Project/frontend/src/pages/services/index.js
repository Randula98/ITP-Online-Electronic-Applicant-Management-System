import React from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import './services.css'

export default function Services() {

	const navigate = useNavigate();

	if (localStorage.getItem("session") === null) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'You have to login as a customer!'
		}).then((result) => {
			navigate("/login/cuslogin");
		})
	}


	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<div className="servicecontainer grid grid-flow-row-dense grid-cols-4">
				<div class="col-span-2 serv servleft"></div>
				<div class="col-span-2 serv servright">
					<div className="servtext">
						<p class="text-4xl font-medium text-gray-900 dark:text-black">Services / Repairs</p>
						<br />
						<a href="/manageservice/addRepair" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-700 dark:hover:bg-gray-400">
							<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white servcard">Place a <b>Service</b> / <b>Repair</b> through the system as a Registered Customer</h5>
						</a>
						<br />
						<div className="servbtn">
							<a href="/manageservice/addRepair">
								<button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
									Place a Service / Repair
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
