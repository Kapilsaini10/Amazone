import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appwrite/config' // Your service file
import OrderCard from '../components/OrderCard'

function Orders() {
  const [orders, setOrders] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.$id) {
      // Fetch orders where the userId matches the logged-in user
      service.getOrders(userData.$id).then((response) => {
        if (response) {
          setOrders(response.documents);
        }
      });
    }
  }, [userData]);

  return (
    <div className="bg-gray-100 min-h-screen pt-10">
      <main className="max-w-screen-lg mx-auto p-10 bg-white shadow-sm rounded-md">
        <h1 className="text-3xl font-semibold border-b pb-4 mb-5">Your Orders</h1>

        <div className="space-y-4 ">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.$id} order={order}   />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Orders