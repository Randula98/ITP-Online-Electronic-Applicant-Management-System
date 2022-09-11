import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class OfferSection extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 3,
		};
		return (
			<div>
				<br />
				<div className="header-bar">
					<div className="header">
						<h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-black-600">Special Offers</h1>
					</div>
				</div>
				<Slider {...settings}>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div>
				</Slider>
			</div>
		);
	}
}
