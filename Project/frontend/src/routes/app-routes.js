import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

// pages
import {
	About,
	Brands,
	Contact,
	AdminDash,
	CusDash,
	EmpDash,
	ErrPage,
	Home,
	Login,
	Cuslogin,
	Emplogin,
	Adminlogin,
	Products,
	Register,
	CusRegister,
	EmpRegister,
	Services,
	CusManagement,
	ViewAllCus,
	SalesManagement
	ServiceManagement,
	HRManagement,
	ViewAllEmp,
	AddPosition,
	UpdatePosition
	StockManagement,
	SupManagement,
} from "../pages";


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

					{/* Login Selection */}
					<Route path="/login" element={<Login />} />
					<Route path="/login/cuslogin" element={<Cuslogin />} />
					<Route path="/login/emplogin" element={<Emplogin />} />
					<Route path="/login/adminlogin" element={<Adminlogin />} />

					{/* Register Selection */}
					<Route path="/register" element={<Register />} />
					<Route path="/register/cusregister" element={<CusRegister />} />
					<Route path="/register/empregister" element={<EmpRegister />} />

					{/* Employee Dashboard */}
					<Route path="/empdash" element={<EmpDash />} />
					{/* Customer Dashboard */}
					<Route path="/cusdash" element={<CusDash />} />
					{/* Admin Dashboard */}
					<Route path="/admindash" element={<AdminDash />} />

					{/* Error Page */}
					<Route path="*" element={<ErrPage />} />

					{/* Customer Management */}
					<Route path="/managecus" element={<CusManagement />} />
					<Route path="/viewallcus" element={<ViewAllCus />} />

					{/* Sales Management */}
					<Route path="/managesales" element={<SalesManagement />} />

					{/* Service Management */}
					<Route path="/manageservice" element={<ServiceManagement />} />
					
					{/* HR Management */}
					<Route path="/managehr" element={<HRManagement />} />
					<Route path="/viewallEmp" element={<ViewAllEmp />} />
					<Route path="/addposition" element={<AddPosition />} />
					<Route path="/updateposition/:id" element={<UpdatePosition />} />

					{/* Stock Management */}
					<Route path="/managestocks" element={<StockManagement />} />
          
					{/* Supplier Management */}
					<Route path="/managesup" element={<SupManagement />} />
          
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
