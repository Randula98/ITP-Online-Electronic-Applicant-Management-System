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
	CusUpdate,
	CusDanger,
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
	ViewCus,
	SalesManagement,
	SetTargetAdd,
	SetDiscountAdd,
	SetPromotionAdd,
	SetTargetUpdate,
	SetDiscountUpdate,
	SetPromotionUpdate,
	Stockadd,
	Stockupdate,
	Stockhome,
	PurchaseManagement,
	ServiceManagement,
	HRManagement,
	ViewAllEmp,
	AddPosition,
	UpdatePosition,
	FinanceDash,
	ReqLoan,
	AddBrand,
	EditBrand,
	BrandView,
	StockView,

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
					<Route path="/cusdash/cusupdate/:id" element={<CusUpdate />} />
					<Route path="/cusdash/cusdanger" element={<CusDanger />} />
					
					{/* Admin Dashboard */}
					<Route path="/admindash" element={<AdminDash />} />

					{/* Error Page */}
					<Route path="*" element={<ErrPage />} />

					{/* Customer Management */}
					<Route path="/managecus" element={<CusManagement />} />
					<Route path="/viewallcus" element={<ViewAllCus />} />
					<Route path="/viewcus/:id" element={<ViewCus />} />

					{/* Stock Management */}
					<Route path="/stockadd" element={<Stockadd />} />
					<Route path="/stockupdate" element={<Stockupdate />} />
					<Route path="/stockhome" element={<Stockhome />} />
					<Route path="/addstock" element={<Stockadd />} />
					<Route path="/editbrand/:id" element={<EditBrand />} />
					<Route path="/brandview" element={<BrandView />} />
					<Route path="/addbrand" element={<AddBrand />} />
					<Route path="/stockview" element={<StockView />} />

					{/* Purchase Management */}
					<Route path="/managepurchase" element={<PurchaseManagement />} />

					{/* Sales Management */}
					<Route path="/managesales" element={<SalesManagement />} />
					<Route path="/managesales/settargetadd" element={<SetTargetAdd />} />
					<Route path="/managesales/setdiscountadd" element={<SetDiscountAdd />} />
					<Route path="/managesales/setpromotionadd" element={<SetPromotionAdd />} />
					<Route path="/managesales/settargetupdate" element={<SetTargetUpdate />} />
					<Route path="/managesales/setdiscountupdate" element={<SetDiscountUpdate />} />
					<Route path="/managesales/setpromotionupdate" element={<SetPromotionUpdate />} />

					{/* Service Management */}
					<Route path="/manageservice" element={<ServiceManagement />} />
          
					{/* HR Management */}
					<Route path="/managehr" element={<HRManagement />} />
					<Route path="/viewallEmp" element={<ViewAllEmp />} />
					<Route path="/addposition" element={<AddPosition />} />
					<Route path="/updateposition/:id" element={<UpdatePosition />} />

					{/* Finance Management */}
					<Route path="/managefinance" element={<	FinanceDash />} />
					<Route path="/reqloan" element={<ReqLoan />} />

				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
