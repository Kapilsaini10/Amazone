import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, removeFromCart } from '../Store/cartSlice'
import { useNavigate } from 'react-router-dom'
import service from '../Appwrite/config'

function CheckOut() {
    const items = useSelector((state) => state.cart.items);
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = items.reduce((total, item) => total + item.price, 0);

    const handleCheckout = async () => {
        if (!authStatus) {
            navigate('/login');
            return;
        }

        try {
            const orderData = {
                userId: userData.$id,
                items: JSON.stringify(items),
                totalAmount: totalPrice,
                status: "paid"
            };

            const response = await service.createOrder(orderData);
            if (response) {
                navigate('/orders');
                dispatch(clearCart());
            }
        } catch (error) {
            console.error("Checkout Error:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="lg:flex max-w-screen-2xl mx-auto p-5 gap-10">
                
                {/* Left Column: Basket Items */}
                <div className="flex-grow shadow-sm p-5 bg-white rounded-md">
                    <h1 className="text-3xl border-b pb-4 mb-5 font-semibold">
                        {items.length === 0 ? "Your Shopping Basket is empty." : "Shopping Basket"}
                    </h1>

                    {items.map((item, i) => (
                        <div key={i} className="flex border-b py-5 items-center justify-between">
                            <div className="flex items-center gap-5">
                                <img src={item.image} alt="" className="h-24 w-24 object-contain" />
                                <div>
                                    <p className="font-bold">{item.title}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                                    <p className="font-bold mt-2">₹{item.price}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                className="bg-yellow-400 cursor-pointer p-2 rounded-sm text-sm border border-yellow-500 hover:bg-yellow-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Column: Subtotal & Checkout */}
                {items.length > 0 && (
                    <div className="flex flex-col bg-white p-10 shadow-md rounded-md h-fit min-w-[300px]">
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items):{" "}
                            <span className="font-bold">₹{totalPrice}</span>
                        </h2>

                        <button
                            onClick={handleCheckout}
                            className={`mt-4 p-2 rounded-sm font-bold border ${
                                !authStatus 
                                ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed" 
                                : "bg-yellow-400 border-yellow-500 hover:bg-yellow-500"
                            }`}
                        >
                            {!authStatus ? "Sign in to checkout" : "Proceed to Checkout"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default CheckOut;