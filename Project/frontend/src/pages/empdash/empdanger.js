import React from 'react'

export default function EmpDanger() {
    return (
        <div>
            <br /><br /><br /><br />
            <div class="cusdanger">
                <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4xl hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900">
                    <img class="object-cover w-250 h-250 rounded-t-lg md:h-200 md:w-100 md:rounded-none md:rounded-l-lg" src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/cusdash%2Fsmartphone-with-danger-sign-with-man-screen-red-background-vector-illustration_123447-3151.jpg?alt=media&token=bab0df09-db7d-45d5-a8ee-f2eb67dc8ebd10" alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal w-150 passform">

                        <form>
                            <div class="mb-6">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter New Password</label>
                                <input type="password" id="password" class="w-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="mb-6">
                                <label for="repassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Re-Enter password</label>
                                <input type="repassword" id="repassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Password</button>
                        </form>
                        <form class="mt-3">
                            <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}