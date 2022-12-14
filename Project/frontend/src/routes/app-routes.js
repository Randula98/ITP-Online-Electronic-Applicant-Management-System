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
	EmpUpdate,
	EmpDanger,
	ErrPage,
	Home,
	Login,
	Cuslogin,
	Emplogin,
	Adminlogin,
	Products,
	TypeViewItems,
	BrandViewItems,
	OneItemView,
	Register,
	CusRegister,
	EmpRegister,
	Services,
	CusManagement,
	ViewAllCus,
	ViewCus,
	CusSearch,
	SalesManagement,
	SetTargetAdd,
	SetDiscountAdd,
	SetPromotionAdd,
	SetTargetUpdate,
	SetDiscountUpdate,
	SetPromotionUpdate,
	ViewAllPromo,
	Stockadd,
	StockUpdate,
	Stockhome,
	ItemTypes,
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
	ItemView,
	ItemViewOne,
	ItemSearch,
	SupManagement,
	SupAddOrder,
	SupAddSupplier,
  	AddDelivery,
	// AddRepair,
	AddLoyalty,
	UpdateLoyalty,
	ViewAllDel,
	ViewDel,
	ViewAllRep,
	ViewRep,
	AddRepair,
	ViewAllSup,
	ViewSup,
	AddPreOrder,
	UpdateSupplier,
	SearchResults,
	Cart,
	CardAdd,
	// CardUpdate,
	// CardView,
	ViewCusProf,
	ViewCartItems,
	AllCompletedOrders,
	SupSearch,
	SearchRep,
	UpdateRep,
	AllLoans,
	SearchLoans,
	EditLoan,
	AddPayments,
	EditPayments,
	ViewAllPayments,
	ViewAllDiscount,
	EnterDist,
	DistSearch,
	SearchCart,
	ViewEmp,
	SearchEmp,
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
					<Route path="/typeitemview/:key" element={<TypeViewItems />} />
					<Route path="/brands" element={<Brands />} />
					<Route path="/branditemview/:key" element={<BrandViewItems />} />
					<Route path="/oneitemview/:id" element={<OneItemView />} />
					<Route path="/services" element={<Services />} />
					<Route path="/searchresults/:key" element={<SearchResults/>}/>
					
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/card" element={<CardAdd />} />

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
					<Route path="/empdash/empupdate/:id" element={<EmpUpdate/>}/> 
					<Route path="/empdash/empdanger/:id" element={<EmpDanger/>}/> 

					{/* Customer Dashboard */}
					<Route path="/cusdash" element={<CusDash />} />
					<Route path="/cusdash/cusupdate/:id" element={<CusUpdate />} />
					<Route path="/cusdash/cusdanger/:id" element={<CusDanger />} />
					<Route path="/cusdash/addloyalty" element={<AddLoyalty />} />
					<Route path="/cusdash/searchcus/:key" element={<CusSearch/>}/>
					
					{/* Admin Dashboard */}
					<Route path="/admindash" element={<AdminDash />} />

					{/* Error Page */}
					<Route path="*" element={<ErrPage />} />

					{/* Customer Management */}
					<Route path="/managecus" element={<CusManagement />} />
					<Route path="/viewallcus" element={<ViewAllCus />} />
					<Route path="/viewcus/:id" element={<ViewCus />} />
					<Route path="/updateLoyalty/:id" element={<UpdateLoyalty/>}/>

					{/* Stock Management */}
					<Route path="/stockadd" element={<Stockadd />} />
					<Route path="/stockupdate/:id" element={<StockUpdate />} />
					<Route path="/stockhome" element={<Stockhome />} />
					<Route path="/addstock" element={<Stockadd />} />
					<Route path="/editbrand/:id" element={<EditBrand />} />
					<Route path="/brandview" element={<BrandView />} />
					<Route path="/addbrand" element={<AddBrand />} />
					<Route path="/stockview" element={<StockView />} />
					<Route path="/itemtypes" element={<ItemTypes />} />
					<Route path="/itemview/:brand" element={<ItemView />} />
					<Route path="/itemsearch/:name" element={<ItemSearch />} />
					<Route path="/itemviewone/:id" element={<ItemViewOne />} />

					{/* Purchase Management */}
					<Route path="/managepurchase" element={<PurchaseManagement />} />
					<Route path="/viewcusprof/:id" element={<ViewCusProf />} />
					<Route path="/viewcartitems/:id" element={<ViewCartItems />} />
					<Route path="/allcompletedorders" element={<AllCompletedOrders />} />
					<Route path="/searchcart/:key" element={<SearchCart/>}/>

					{/* Sales Management */}
					<Route path="/managesales" element={<SalesManagement />} />
					<Route path="/managesales/settargetadd" element={<SetTargetAdd />} />
					<Route path="/managesales/setdiscountadd" element={<SetDiscountAdd />} />
					<Route path="/managesales/setpromotionadd" element={<SetPromotionAdd />} />
					<Route path="/managesales/settargetupdate" element={<SetTargetUpdate />} />
					<Route path="/managesales/setdiscountupdate/:id" element={<SetDiscountUpdate />} />
					<Route path="/managesales/setpromotionupdate/:id" element={<SetPromotionUpdate />} />
					<Route path="/managesales/viewallpromo" element={<ViewAllPromo />} />
					<Route path="/managesales/viewalldiscount" element={<ViewAllDiscount />} />
					<Route path="/managesales/enterdist/:id" element={<EnterDist />} />
					<Route path="/managesales/searchdist/:key" element={<DistSearch />} />
					
					{/* Service Management */}
					<Route path="/manageservice" element={<ServiceManagement />} />
					<Route path="/manageservice/addDelivery" element={<AddDelivery />} />
					<Route path="/manageservice/viewalldel" element={<ViewAllDel />} />
					<Route path="/manageservice/viewdel/:id" element={<ViewDel />} />
					<Route path="/manageservice/viewallrep" element={<ViewAllRep />} />
					<Route path="/manageservice/viewrep/:id" element={<ViewRep />} />
					<Route path="/manageservice/addrepair" element={<AddRepair />} />
					<Route path="/manageservice/searchrep/:key" element={<SearchRep />} />
					<Route path="/manageservice/updaterep/:id" element={<UpdateRep />} />
          
					{/* HR Management */}
					<Route path="/managehr" element={<HRManagement />} />
					<Route path="/viewallEmp" element={<ViewAllEmp />} />
					<Route path="/addposition" element={<AddPosition />} />
					<Route path="/updateposition/:id" element={<UpdatePosition />} />
					<Route path="/viewemployee/:id" element={<ViewEmp/>}/>
					<Route path="/searchemp/:key" element={<SearchEmp />} />

          
					{/* Finance Management */}
					<Route path="/managefinance" element={<	FinanceDash />} />
					<Route path="/reqloan" element={<ReqLoan />} />
					<Route path="/searchloans/:key" element={<SearchLoans />} />
					<Route path="/allloans" element={<AllLoans />} />
					<Route path="/editloan/:id" element={<EditLoan />} />
					<Route path="/addpayments" element={<AddPayments />} />
					<Route path="/viewallpayments" element={<ViewAllPayments />} />
					<Route path="/editpayments/:id" element={<EditPayments />} />

					{/* Supplier Management */}
					<Route path="/managesup" element={<SupManagement />} />
					<Route path="/addOrder/:id" element={<SupAddOrder />} />
					<Route path="/addSupplier" element={<SupAddSupplier />} />
					<Route path="/viewallsup" element={<ViewAllSup />} />
					<Route path="/viewsup/:id" element={<ViewSup />} />
					<Route path="/addPreOrder" element={<AddPreOrder />} />
					<Route path="/updateSupplier/:id" element={<UpdateSupplier />} />
					<Route path="/searchsup/:key" element={<SupSearch />} />
          
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
