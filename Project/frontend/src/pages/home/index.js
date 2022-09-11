import React from "react";

import HeroSection from "./HeroSection";
import OfferSection from "./OfferSection";
import LaptopsSection from "./LaptopsSection";
import MobilePhoneSection from "./MobilePhoneSection";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<OfferSection />
      <MobilePhoneSection />
			<LaptopsSection />
		</div>
	);
};

export default Home;
