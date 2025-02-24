import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [data ,setData ]  = useState('')

  const getOrders = async () => {

    try{
      const res = await axios.get("http://127.0.0.1:3030/getAllOrders")
      if(res.status === 200){
        // console.log(res.data)
        setOrders(res.data)
      }
      else{
        console.log("Error")
      }
  }
  catch(err){
    console.log(err)
  }
}

const OrderUpdate = async (id)=>{

     try{

        var datam = {
          status :data
        }
         const res = await axios.put(`http://127.0.0.1:3030/acceptOrder/${id}`,datam)

         if(res.status == 200){
           toast.success(res.data.message)
           console.log(res)
         }
        // console.log(data)

     }
     catch(err){
         console.log(err)
     } 

}

useEffect(()=>{
    getOrders()
},[])
  const statusOptions = ["Pending", "Accepted", "Delivered","Cancel"];

  const handleStatusChange = (index, newStatus) => {
    
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    setData(newStatus)
  };

  // Total Price Calculation
  const totalPrice = orders.reduce((acc, order) => acc + parseFloat( order.price), 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Orders Management</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              
              <th>Sr no</th>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Price (₹)</th>
              <th>Order Created at </th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{order.orderID}</td>
                <td>{order.userId}</td>
                <td>{order.productName}</td>
                <td>₹{parseInt(order.price.toLocaleString())}</td>
                <td>{order.orderCreated}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    {statusOptions.map((status, i) => (
                      <option key={i} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => OrderUpdate(order.orderID)}>
                    OK
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="table-secondary">
              <td colSpan="4" className="text-end fw-bold">Total Price:</td>
              <td colSpan="4" className="fw-bold">₹{totalPrice.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Order;
