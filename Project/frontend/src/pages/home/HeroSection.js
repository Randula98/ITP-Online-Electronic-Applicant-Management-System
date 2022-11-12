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
					<button
						type="button"
						data-bs-target="#carouselExampleCaptions"
						data-bs-slide-to="3"
						aria-label="Slide 4"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleCaptions"
						data-bs-slide-to="4"
						aria-label="Slide 5"
					></button>
				</div>
				<div className="carousel-inner relative w-full overflow-hidden">
					<div className="carousel-item active relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2F1.jpg?alt=media&token=1995b58e-5d8a-4de7-90a4-fdeb81c10ef3"
							className="block w-full" alt="..." />
					</div>
					<div className="carousel-item relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2F2.png?alt=media&token=0111af1e-4ddf-42f2-81c0-17ce6a4649b0"
							className="block w-full" alt="..." />
					</div>
					<div className="carousel-item relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2F3.png?alt=media&token=403a9834-2312-47c5-997e-ad188edbdcce"
							className="block w-full" alt="..." />
					</div>
					<div className="carousel-item relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2F4.png?alt=media&token=8cd2b0b4-3e77-465e-8454-c441618c4853"
							className="block w-full" alt="..." />
					</div>
					<div className="carousel-item relative float-left w-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/slider%2F5.png?alt=media&token=2862f67d-5e71-4d29-a725-8fd703282273"
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
