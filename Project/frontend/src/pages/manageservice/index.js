import React , {useState , useEffect} from 'react'
import "./index.css";

const RecordNewDelivery = (props) => (

    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cuscard">
        <a href="#">
            <img className="rounded-t-lg" src="https://via.placeholder.com/300" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">ITEM NAME
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Delivery ID<br />
                Customer Name<br />
            </p>
            <a href="#"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 vbtn">
                View Details
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>

);

const RecordNewRepairs = (props) => (

    <div
        class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cuscard">
        <a href="#">
            <img class="rounded-t-lg" src="https://via.placeholder.com/300" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">ITEM NAME
                </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Customer ID<br />
                Repair ID<br />
            </p>
            <a href="#"
                class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800B vbtn">
                View Details
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
);
const RecordRepairedItems = (props) => (

    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.customerid}
        </th>
        <td className="py-4 px-6">
            {props.record.employeeid}
        </td>
        <td className="py-4 px-6">
            {props.record.repairdate}
        </td>
        <td className="py-4 px-6">
            {props.record.itemname}
        </td>
        <td className="py-4 px-6">
            {props.record.repaidescription}
        </td>
        <td className="py-4 px-6">
            {props.record.repairfee}
        </td>
    </tr>


);

const RecordDeliveredItems = (props) => (

    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.itemid}
        </th>
        <td className="py-4 px-6">
            {props.record.customerid}
        </td>
        <td className="py-4 px-6">
            {props.record.date}
        </td>
        <td className="py-4 px-6">
            {props.record.remarks}
        </td>
    </tr>


);
export default function ServiceManagement() {
    
    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);
    const [records4, setRecords4] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delivery/`);

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
    },[records.length]);

    useEffect(() => {
        async function getRecords2() {
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/repair/`);

            if (!response2.ok) {
                const message = `An error occurred: ${response2.statusText}`;
                window.alert(message);
                return;
            }

            const records2 = await response2.json();
            setRecords2(records2);
        }

        getRecords2();

        return;
    }, [records2.length]);

    useEffect(() => {
        async function getRecords3() {
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}//`);

            if (!response3.ok) {
                const message = `An error occurred: ${response3.statusText}`;
                window.alert(message);
                return;
            }

            const records3 = await response3.json();
            setRecords3(records3);
        }

        getRecords3();

        return;
    }, [records3.length]);

    useEffect(() => {
        async function getRecords4() {
            const response4 = await fetch(`${process.env.REACT_APP_BACKEND_URL}//`);

            if (!response4.ok) {
                const message = `An error occurred: ${response4.statusText}`;
                window.alert(message);
                return;
            }

            const records4 = await response4.json();
            setRecords4(records4);
        }
        getRecords4();
        return;
    }, [records4.length]);


    return (

        <div>
            

        </div>
    )

}