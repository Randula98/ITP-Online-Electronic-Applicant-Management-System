/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import "./sales.css";






const RecordAllPromos = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 promocard">
        <a href={`/viewpromo/${props.record._id}`}>
            <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.promoname}</h5>
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.precentage} - OFF</h5>
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">Rs. {props.record.promoprice}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-700">
                {props.record.startdate}<br />
                {props.record.enddate}<br />
            </p>
            <Link className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" to={`/managesales/setpromotionupdate/${props.record._id}`}>Update</Link>
            <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}>Delete</button>
        </div>
    </div>
);

export default function ViewAllPromo() {

    const [records, setRecords] = useState([]);
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/promotion/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();

        return;
    }, [records.length]);

    //  This method will delete a record
    async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/promotion/delete/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }
    //Print Promotion History
    async function printPdf(e) {
      
        e.preventDefault();
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Promotion History Between "+startdate+" and "+enddate;
        const headers = [["Promotion Id","Promotion Name", "Percentage","Price","Start Date","End Date"]];
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/promotion/getHistory/${startdate}/${enddate}`);
    
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
     
        const data = records.map(elt=> [elt._id,elt.promoname, elt.precentage,elt.promoprice,elt.startdate.split('T')[0],elt.enddate.split('T')[0]]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }
    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordAllPromos
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div className="allPromos">
            <div className="p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
                <span className="font-large text-2xl" >All Promotions Registered In The System</span>
            </div>

            <div className="row rowpromo">
                <br />
                <a href="/managesales/setpromotionadd"><button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add New Promotions</button></a>
            </div>


            <div date-rangepicker="" class="flex items-center">

                <div className="relative">
                    <div
                        className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input name="start" type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                        placeholder="Select date start"
                        onChange={(e) => setStartdate(e.target.value)}
                        required
                    />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div
                        className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input name="end" type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                        placeholder="Select date end"
                        onChange={(e) => setEnddate(e.target.value)}
                        required />
                </div>
                &nbsp; &nbsp; &nbsp;

                <button 
                onClick={printPdf}
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Dawnload History
                </button>

            </div>
            <br></br>
            {/* <div>
                <button type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Dawnload History
                </button>



            </div> */}





            <div className="list">
                {recordList()}
            </div>
        </div>
    )
}