import React from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function Services() {

	  const navigate = useNavigate();

	if(localStorage.getItem("session") === null) {
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
			<h1>Services</h1>
		</div>
	);
}
