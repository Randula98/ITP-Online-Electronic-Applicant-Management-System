
import React from 'react'
import "./index.css";

const RecordNewSales = (props) => (
  <tr>
  <th scope="col" className="py-3 px-6">
      Customer Number
  </th>
  <th scope="col" className="py-3 px-6">
      Number of Actions
  </th>
  <th scope="col" className="py-3 px-6">
      Start Date
  </th>
  <th scope="col" className="py-3 px-6">
      End Date
  </th>
  
  <th scope="col" className="py-3 px-6">
      Action
  </th>
</tr>
  
);
const RecordDiscounts = (props) => (
  <tr>
  <th scope="col" className="py-3 px-6">
      Discount Item
  </th>
  <th scope="col" className="py-3 px-6">
      Discount Presentage
  </th>
  <th scope="col" className="py-3 px-6">
      Remarks
  </th>
  
  
  <th scope="col" className="py-3 px-6">
      Action
  </th>
</tr>
  
);
const RecordPromotions = (props) => (
  <tr>
  <th scope="col" className="py-3 px-6">
      Promotion Name
  </th>
  <th scope="col" className="py-3 px-6">
      Precentage
  </th>
  <th scope="col" className="py-3 px-6">
      Start Date
  </th>
  <th scope="col" className="py-3 px-6">
      End Date
  </th>
  
  <th scope="col" className="py-3 px-6">
      Action
  </th>
</tr>
  
);


export default function index() {
  return (
   <div>
       <h1>Manage Sales</h1>
   </div>
  )
}