import React from 'react';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#232F3E] text-white ">
            {/* Back to Top Button */}
            <div 
                onClick={scrollToTop}
                className="bg-[#37475A] hover:bg-[#485769] text-center py-4 cursor-pointer text-sm font-semibold transition-all"
            >
                Back to top
            </div>

            {/* Main Footer Links */}
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10 justify-items-center md:justify-items-start">
                <div className="space-y-3">
                    <h4 className="font-bold text-lg">Get to Know Us</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li className="hover:underline cursor-pointer">About Us</li>
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Press Releases</li>
                        <li className="hover:underline cursor-pointer">Amazone Science</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-lg">Connect with Us</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li className="hover:underline cursor-pointer">Facebook</li>
                        <li className="hover:underline cursor-pointer">Twitter</li>
                        <li className="hover:underline cursor-pointer">Instagram</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-lg">Make Money with Us</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li className="hover:underline cursor-pointer">Sell on Amazone</li>
                        <li className="hover:underline cursor-pointer">Protect and Build Your Brand</li>
                        <li className="hover:underline cursor-pointer">Become an Affiliate</li>
                        <li className="hover:underline cursor-pointer">Advertise Your Products</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h4 className="font-bold text-lg">Let Us Help You</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li className="hover:underline cursor-pointer">COVID-19 and Amazone</li>
                        <li className="hover:underline cursor-pointer">Your Account</li>
                        <li className="hover:underline cursor-pointer">Returns Centre</li>
                        <li className="hover:underline cursor-pointer">Amazone App Download</li>
                        <li className="hover:underline cursor-pointer">Help</li>
                    </ul>
                </div>
            </div>

            <hr className="border-gray-600" />

            {/* Bottom Copyright Area */}
            <div className="flex flex-col items-center py-10 space-y-2">
                <div className="flex items-center space-x-2 text-2xl font-bold italic">
                    amazone.in
                </div>
                <div className="text-xs text-gray-400">
                    © 1996-2026, Amazone.com, Inc. or its affiliates
                </div>
            </div>
        </footer>
    );
}

export default Footer;