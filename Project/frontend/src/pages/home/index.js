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
      <KitchenItemSection />
		</div>
	);
};

export default Home;
