import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import Home from "../pages/home";
import Products from "../pages/products";
import Brands from "../pages/brands";
import Services from "../pages/services";
import About from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/login";
import Register from "../pages/register";

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<Routes>
					{/* Basic Routing */}
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/brands" element={<Brands />} />
					<Route path="/services" element={<Services />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
