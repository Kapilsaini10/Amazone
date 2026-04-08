import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/cartSlice';

function ProductCard({ id, title, price, description, category, image, rating }) {
    const dispatch = useDispatch();

    return (
        /* aspect-[4/5] gives it that "not quite square" professional look */
        <div className="relative flex flex-col bg-white p-6 transition-all duration-300 hover:shadow-xl rounded-sm aspect-[4/5] group border border-gray-100">
            {/* Subtle Category Tag */}
            <p className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                {category}
            </p>

            {/* Floating Image Container */}
            <div className="flex-grow flex items-center justify-center p-4">
                <img 
                    src={image} 
                    alt={title} 
                    /* mix-blend-multiply removes white backgrounds from images */
                    className="h-48 w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110" 
                    onError={(e) => {
                   e.target.onerror = null; 
        // This is a clean, white-background placeholder
                     e.target.src = "https://placehold.co/400x400/FFFFFF/E2E8F0?text=Product+Image";}}
            />
            </div>

            {/* Content Area */}
            <div className="mt-auto space-y-2">
                <h4 className="font-medium text-gray-800 line-clamp-1 text-sm md:text-base">
                    {title}
                </h4>

                <div className="flex text-yellow-500 text-[10px]">
                    {Array(Math.floor(rating)).fill().map((_, i) => (
                        <span key={i}>⭐</span>
                    ))}
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-gray-900">₹{price}</span>
                    
                    <button 
                        onClick={() => dispatch(addToCart({ id, title, price, description, category, image, rating }))}
                        className="bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 py-1.5 px-4 rounded-sm text-gray-900 cursor-pointer font-bold transition-all active:scale-95 shadow-sm"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;