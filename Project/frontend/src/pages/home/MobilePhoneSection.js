import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import './home.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecordMobiles = (props) => (
	<div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 brandcard itemcardview itemtypeitemhome">
        <div className="brandcardimg homeimg">
            <a href={`/oneitemview/${props.record._id}`}>
                <img className="rounded-t-lg homeimgcard" src={props.record.imgurl} alt="" />
            </a>
        </div>
        <div className="p-5">
            <a href={`/oneitemview/${props.record._id}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.itemname}
                </h5>
            </a>

            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-gray-700">Rs.{props.record.unitprice}
            </h5>
            <a href={`/oneitemview/${props.record._id}`}>
                <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    View Item</button>
            </a>

        </div>
    </div>
)

export default function MobilePhoneSection() {
	const [records, setRecords] = useState([]);

	// This method fetches the records from the database.
	useEffect(() => {
		async function getRecords() {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/item/random/Mobile-Phones`);

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
			const records = await response.json();
			setRecords(records);
		}
		getRecords();

		return;
	}, [records.length]);

	// This method will delete a record
	// async function deleteRecord(id) {
	//     await fetch(`http://localhost:5000/${id}`, {
	//         method: "DELETE"
	//     });

	//     const newRecords = records.filter((el) => el._id !== id);
	//     setRecords(newRecords);
	// }

	// This method will map out the records on the table
	function recordList() {
		return records.map((record) => {
			return (
				<RecordMobiles
					record={record}
					// deleteRecord={() => deleteRecord(record._id)}
					key={record._id}
				/>
			);
		});
	}
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 3000,
		cssEase: "linear",
	};
	return (
		<div>
			<br />
			<div className="header-bar">
				<div className="header">
					<h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-black-600">Mobile Phones on Sale!!!</h1>
				</div>
			</div>
			<div className="slidings">
				<Slider {...settings}>
					{/* <div>
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
					<div>
						<img src="https://via.placeholder.com/500x400" className="w-100" />
					</div> */}
					{recordList()}
				</Slider>
			</div>
		</div>
	);
}