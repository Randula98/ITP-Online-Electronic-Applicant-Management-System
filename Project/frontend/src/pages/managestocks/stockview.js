import React from 'react'
import './Stock.css'

export default function StockView() {
  return (
    <div>
      <div className="stockviewhead">
        <a href="/addstock"><button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Stocks</button></a>
      </div>

      <div className="stockviewbody">
        

      </div>
    </div>
  )
}