import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Store/authSlice';
import authService from '../Appwrite/auth';
import { 
    MagnifyingGlassIcon, 
    ShoppingCartIcon, 
    Bars3Icon 
} from "@heroicons/react/24/outline";
import { clearCart } from '../store/cartSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // Track search input
    
    
    // Get state from Redux
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const items = useSelector((state) => state.cart.items);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navigate to home and pass the search term via URL or state
            navigate(`/?search=${searchTerm}`);
        }
    };

    const handleLogout = async () => {
     
    try {
        // 1. Stop any auto-checks by setting a local "loggingOut" flag if needed, 
        // or just await the service strictly.
        await authService.logout(); 
        // 2. Clear Redux AFTER the    
        dispatch(logout()); 
        dispatch(clearCart());
        

        // 3. Redirect to login IMMEDIATELY
    } catch (error) {
        console.error("Logout failed:", error);
    }

    };

    return (
        <header className=" top-0 z-50">
            {/* Top Nav */}
            <div className="flex items-center bg-[#131921] p-1 flex-grow py-2">
                {/* Logo */}
                <div 
                    onClick={() => navigate('/')}
                    className=" flex items-center flex-grow sm:flex-grow-0 cursor-pointer px-4"
                >
                    <h1 className="text-white mb-2 font-bold text-2xl italic">amazone.in</h1>
                </div>

                {/* Search Bar */}
                
                    <form onSubmit={handleSearch}
                    className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-white hover:bg-white mx-4">
                    <input 
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 text-black" 
                        type="text" 
                        placeholder="Search Amazone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="h-12 p-4 text-black" />
                    </form>
                

                {/* Right Side Items */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    
                    {/* Account/Logout Section */}
                    <div 
                        onClick={authStatus ? handleLogout : () => navigate('/login')}
                        className="link cursor-pointer hover:border border-white p-1"
                    >
                        <p className="hover:underline">
                            {authStatus ? `Hello, ${userData?.name}` : "Hello, Sign in"}
                        </p>
                        <p className="font-extrabold md:text-sm">
                            {authStatus ? "Logout" : "Account & Lists"}
                        </p>
                    </div>

                    {/* Orders Section */}
                    <div 
                        onClick={() => navigate('/orders')}
                        className="link cursor-pointer hover:border border-white p-1"
                    >
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>

                    {/* Basket Section */}
                    <div 
                        onClick={() => navigate('/checkout')}
                        className="relative link flex items-center cursor-pointer hover:border border-white p-1"
                    >
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold text-[10px]">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center gap-5 space-x-5 p-2 pl-6 bg-[#232f3e] text-white text-sm">
                <p className="link flex items-center font-bold">
                    <Bars3Icon className="h-6 mr-1" />
                    All
                </p>
                <p className="link cursor-pointer hover:border border-white p-1">Prime Video</p>
                <p className="link cursor-pointer hover:border border-white p-1">Amazone Business</p>
                <p className="link cursor-pointer hover:border border-white p-1">Today's Deals</p>
                <p className="link hidden lg:inline-flex cursor-pointer hover:border border-white p-1">Electronics</p>
                <p className="link hidden lg:inline-flex cursor-pointer hover:border border-white p-1">Food & Grocery</p>
                <p className="link hidden lg:inline-flex cursor-pointer hover:border border-white p-1">Prime</p>
                <p className="link hidden lg:inline-flex cursor-pointer hover:border border-white p-1">Buy Again</p>
            </div>
        </header>
    );
}

export default Navbar;