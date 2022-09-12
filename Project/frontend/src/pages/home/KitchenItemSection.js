import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class KitchenItemSection extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 2,
			autoplay: true,
			autoplaySpeed: 3000,
			cssEase: "linear",
		};
		return (
			<div>
				<br />
				<div className="header-bar">
					<div className="header">
						<h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-black-600">Kitchen Items on Sale!!!</h1>
					</div>
				</div>
				<div className="slidings">
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
			</div>
		);
	}
}
