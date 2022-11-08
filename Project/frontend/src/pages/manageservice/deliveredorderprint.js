/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link } from "react-router-dom";
import './serv.css'

const RecordDeliveredOrders = (props) => (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.record.customername}
    </th>
    <td class="py-4 px-6">
        {props.record.placeddate}
    </td>
    <td class="py-4 px-6">
        <a href={`/viewcus/${props.record.customerid}`}>
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
            </button>
        </a>
    </td>
    <td class="py-4 px-6">
        <a href={`/viewcartitems/${props.record.cartid}`}>
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View
            </button>
        </a>
    </td>
    <td>
        Rs. {props.record.totalprice}
    </td>
    <td class="py-4 px-6">
        <button
            onClick={() => { props.deleteRecordcart(props.record._id) }}
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Delete</button>
    </td>
</tr>
);


export class DeliveredOrdersPrint extends React.PureComponent {

    // const [records2, setRecords2] = useState([]);

    // useEffect(() => {
    //     async function getRecords2() {
    //         const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/top5`);

    //         if (!response2.ok) {
    //             const message = `An error occurred: ${response2.statusText}`;
    //             window.alert(message);
    //             return;
    //         }

    //         const records2 = await response2.json();
    //         setRecords2(records2);
    //     }

    //     getRecords2();

    //     return;
    // }, [records2.length]);

    // function recordList2() {
    //     return records2.map((record) => {
    //         return (
    //             <RecordTopCus
    //                 record={record}
    //                 // deleteRecord={() => deleteRecord(record._id)}
    //                 key={record._id}
    //             />
    //         );
    //     });
    // }

    state = {
        records2: []
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delivered`)
            .then(response => response.json())
            .then(records2 => this.setState({ records2 }));
    }

    render() {
        return (
            <div>
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Customer Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Placed Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Customer Profile
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Cart Items
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Price
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.records2.map((record) => {
                                    return (
                                        <RecordDeliveredOrders
                                            record={record}
                                            // deleteRecord={() => deleteRecord(record._id)}
                                            key={record._id}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <br />
            </div>
        );
    }
}

