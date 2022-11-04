import React from "react";
import "./index.css";

export function HeroSection() {
	return (
		<div className="heroSection">
			<div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
				<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
					<button
						type="button"
						data-bs-target="#carouselExampleCaptions"
						data-bs-slide-to="0"
						className="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleCaptions"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleCaptions"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div className="carousel-inner relative w-full overflow-hidden">
					<div className="carousel-item active relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2FAdvertiesment%202.png?alt=media&token=160fab3d-58ad-429d-b2a0-233fd811c4cc"
							className="block w-full" alt="..." />
					</div>
					<div className="carousel-item relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2FAdvertiesment%203.png?alt=media&token=96b49321-b61f-40c4-b05c-4e15e0c48638"
							className="block w-full" alt="..." />
					</div>
					<div className="carousel-item relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2FAdvertisement%201.png?alt=media&token=593af167-7290-4d74-b5fb-9ec67e5688df"
							className="block w-full" alt="..." />
					</div>
				</div>
				<button
					className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide="prev"
				>
					<span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide="next"
				>
					<span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	);
}

export default HeroSection;
