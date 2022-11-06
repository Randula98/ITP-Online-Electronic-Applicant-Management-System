import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./purchases.css";

export default function ViewCusProf() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    contactno: "",
    address: "",
    email: "",
    totalpurchases: "",
    totalamount: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/customer/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/viewallcus");
        return;
      }

      setForm(record);
    }
    fetchData();

    return;
  }, [params.id, navigate]);

  async function deleteRecord(id) {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/delete/${id}`, {
        method: "DELETE"
    });

    navigate("/viewallcus");
}

  return (
    <div>
      <div class="viewcus dark:bg-gray-700 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
        <div class="col-span-3"><img src={form.imgurl} alt="" />
        </div>

        <div class="">
          <p class="text-lg"><b>{form.fname}&#160;{form.lname}</b></p>
          <br />
          <p class="text-lg sm">{form.contactno} </p>
          <p class="text-lg sm">{form.address} </p>
          <p class="text-lg sm">{form.email} </p>
          <p class="text-lg sm">Total&#160;Purchases&#160;Done&#160;-{form.totalpurchases} </p>
          <p class="text-lg sm">Total&#160;Spent&#160;Amount&#160;-{form.totalpayments} </p>
          <p class="text-lg sm">Loyalty&#160;Level&#160;-&#160;{form.loyaltylevel} </p>

        </div>


      </div>
    </div>
  )
}