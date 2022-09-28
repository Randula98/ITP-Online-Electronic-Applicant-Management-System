import React from 'react'
import "./index.css"

export default function ViewCus() {
  return (
    <div>
      <div class="viewcus dark:bg-gray-700 grid grid-cols-7 gap-4 hover:bg-gray-500 left">
        <div class="col-span-3"><img src = "https://via.placeholder.com/400" alt = ""/>
        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Profile</button></div>
        
        <div class="">
          <p class = "text-lg"><b>fname&#160;lname</b></p>
          <p class = "text-lg sm">ContactNo</p>
          <p class = "text-lg sm">Address</p>
          <p class = "text-lg sm">ContactNo</p>
          <p class = "text-lg sm">Email</p>
          <p class = "text-lg sm">Total&#160;Purchases&#160;Done&#160;-x</p>
          <p class = "text-lg sm">Total&#160;Spent&#160;Amount&#160;-x</p>

        </div>
      </div>
    </div>
  )
}