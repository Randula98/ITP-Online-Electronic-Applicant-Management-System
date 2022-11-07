/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link } from "react-router-dom";
import "./Stock.css";

const RecordLowStock = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.brand}
        </th>
        <td className="py-4 px-6">
            {props.record.itemname}
        </td>
        <td className="py-4 px-6">
            {props.record.itemtype}
        </td>
        <td className="py-4 px-6">
            {props.record.unitprice}
        </td>
        <td className="py-4 px-6">
            {props.record.unitstock}
        </td>
        <td className="py-4 px-6">
            <a href={`/addOrder/${props.record._id}`}>
                <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Order Items
                </button>
            </a>
        </td>
    </tr>
);


export class LowStockPrint extends React.PureComponent {

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
        fetch(`${process.env.REACT_APP_BACKEND_URL}/item/low`)
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
                                    <th scope="col" className="py-3 px-6">
                                        Brand
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Item Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Stocks Remaining
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.records2.map((record) => {
                                    return (
                                        <RecordLowStock
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

