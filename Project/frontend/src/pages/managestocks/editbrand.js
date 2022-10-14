import React from 'react'
import "./brand.css";

export default function EditBrand() {
  return (
    <div>
         <center>
        <h1 class="text-5xl font-extrabold text-white ">Update Brand</h1>
      </center>
      <br />
      <br />
      <form class="frame">
        <div class="mb-6">
          <div>
            <label for="Item Name" class="block mb-2 text-sm font-medium text-white ">Brand
              Name</label>
            <input type="text" id="bname"
              class="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I phone" required="" />
          </div>
        </div>
        <br />

        <div class="mb-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-white" for="multiple_files">Item Image </label>
            <input
              class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="itemimg" type="file" multiple="" />
          </div>

        </div>
        <center>
          <button type="submit"
            class="text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Update Details</button>
        </center>
      </form>
    </div>
  )
}

