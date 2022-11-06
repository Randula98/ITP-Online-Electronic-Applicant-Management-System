import React, { Component } from "react";
import "./aboutus.css";

export default class About extends Component {
	render() {
		return (
			<div>
				<br />
				<br />
				<br />
				<br />
				<h1>About Us</h1>

				<div class="flex-container">

					<div class="flex-child magenta">
						<p class="para">

							Synthetic Dealz is a business that was established in 2010 and has a sizable clientele as well as a
							well-known stellar reputation for the caliber of its electronic candidates.
							Customers can purchase new electronic applications from the company, receive applications by
							delivery if necessary, and have used electronic applications repaired or serviced.
							To achieve maximum efficiency and streamline the company's process, this system was meticulously
							designed.

						</p>
					</div>

					<div class="flex-child green">
						<iframe class="map"
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1980.576732363835!2d79.9670716!3d6.8722082!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2511c53a187ff%3A0x6008df5c046e6f27!2zNsKwNTInMTkuMyJOIDc5wrA1OCcwMS4zIkU!5e0!3m2!1sen!2slk!4v1667752477520!5m2!1sen!2slk"
							width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"></iframe>
					</div>

				</div>

			</div>
		);
	}
}
