import React from 'react'

function OrderCard({ order }) {
    const items= JSON.parse(order.items); // Parse the items string back to an array
  return (
    <div className="relative border rounded-md bg-white mb-4 h-screen shadow-sm max-w-4xl mx-auto">
      {/* Order Header */}
      <div className="flex items-center space-x-5 p-5 bg-gray-100 text-sm text-gray-600 border-b">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{new Date(order.$createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p className="font-semibold">₹{order.totalAmount}</p>
        </div>
       
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {order.$id}
        </p>
      </div>

      {/* Order Items */}
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          
          {items.map((item, index) => (
            <img 
              key={index} 
              src={item.image} 
              alt="" 
              className="h-20 object-contain sm:h-32" 
              
            />
            
          ))}

        </div>
        
      </div>
    </div>
  )
}

export default OrderCard