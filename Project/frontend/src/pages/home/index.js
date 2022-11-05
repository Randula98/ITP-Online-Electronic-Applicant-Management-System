/* eslint-disable no-unused-vars */
import React from "react";

import HeroSection from "./HeroSection";
import OfferSection from "./OfferSection";
import MobilePhoneSection from "./MobilePhoneSection";
import LaptopsSection from "./LaptopsSection";
import KitchenItemSection from "./KitchenItemSection";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<OfferSection />
			<MobilePhoneSection />
			<LaptopsSection />
			{/* <KitchenItemSection /> */}
			<br/>
		</div>
	);
};

export default Home;
