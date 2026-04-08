import React from 'react';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  

 const products = [
    {
  "id": 109,
  "title": "Apple Watch Series 9",
  "price": 4999,
  "category": "Electronics",
  "description": "The most powerful chip in Apple Watch ever. A magical new way to use your watch without touching the screen.",
   "image": "https://t3.ftcdn.net/jpg/05/89/20/84/360_F_589208452_jTxyYyu4DdPnVKFz2MBBb3nNs71ouyFo.jpg",  "rating": 4
},
{
  "id": 112,
  "title": "Sony BRAVIA 3 65-inch 4K TV",
  "price": 35999,
  "category": "Electronics",
  "description": "Experience billions of real-world colors with Triluminos Pro and 4K HDR Processor X1.",
  "image": "https://www.intex.in/cdn/shop/products/1_9b8014ad-124e-4742-a628-9a4c4affe617.jpg?v=1750330801",
  "rating": 5
},
{
    "id": 101,
    "title": "Samsung Galaxy S24 Ultra",
    "price": 78999,
    "category": "Electronics",
    "description": "6.8-inch Dynamic AMOLED, Titanium Frame, and 200MP Camera.",
    "image": "https://www.dxomark.com/wp-content/uploads/medias/post-165263/Samsung-Galaxy-S24-Ultra_Yoast-image-packshot-review.jpg",
    "rating": 5
  },
  {
    "id": 102,
    "title": "Apple iPad Air M2",
    "price": 24999,
    "category": "Electronics",
    "description": "Powerful M2 chip in a thin, light design. Perfect for creators.",
    "image": "https://thumbs.dreamstime.com/b/apple-ipad-air-starlight-color-isolated-transparent-background-vector-illustration-th-generation-tablet-computer-319395814.jpg",
    "rating": 5
  },
  {
    "id": 103,
    "title": "Sony PlayStation 5 Slim",
    "price": 50999,
    "category": "Electronics",
    "description": "Experience lightning-fast loading and deeper immersion with the PS5.",
    "image": "https://png.pngtree.com/png-vector/20240802/ourmid/pngtree-top-quality-play-station-console-isolated-on-transparent-background-png-image_13320220.png",
    "rating": 4
  },
  {
    "id": 104,
    "title": "Nintendo Switch OLED",
    "price": 11999,
    "category": "Electronics",
    "description": "7-inch OLED screen with vivid colors and crisp contrast.",
    "image": "https://www.nintendo.com/my/hardware/detail/switch-oled/img/01-bgdark/main_pic_sp.png",
    "rating": 4
  },
  {
    "id": 113,
  "title": "Midea Duo Smart Inverter AC",
  "price": 21999,
  "category": "Electronics",
  "description": "Innovative hose-in-hose design for 2x faster cooling. Ultra-quiet 42dB operation with variable-speed inverter technology for 40% energy savings.",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDXdBQf6WjKdtXDxniwKaxIPnPOg1jqjkqw&s",
  "rating": 5
  },
  {
    "id": 106,
    "title": "DJI Mini 4 Pro Drone",
    "price": 70999,
    "category": "Electronics",
    "description": "Under 249g, 4K/60fps HDR True Vertical Shooting drone.",
    "image": "https://static.vecteezy.com/system/resources/thumbnails/066/398/360/small_2x/isolated-white-drone-unmanned-aerial-vehicle-with-camera-on-transparent-background-png.png",
    "rating": 5
  },

  {
    "id": 108,
    "title": "Dell XPS 13 Laptop",
    "price": 45999,
    "category": "Electronics",
    "description": "The smallest 13-inch laptop with a refined InfinityEdge display.",
    "image": "https://www.dell.com/wp-uploads/2024/01/XPS-9640-laptops-back-to-back-1280x800-1-640x400.jpg",
    "rating": 5
  }
  ];
  const filteredProducts = products.filter((product) => 
        product.title.toLowerCase().includes(searchQuery) || 
        product.category.toLowerCase().includes(searchQuery)
    );

  
  
    return (
        <div className="bg-gray-100 min-h-screen pb-20">
            {/* 1. Banner */}
            <Banner />

            {/* 2. Grid Container */}
            {/* max-w-6xl ensures the 3 columns don't get too wide on big screens */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -mt-10 lg:-mt-48 relative z-40">
                    
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            category={product.category}
                            image={product.image}
                            rating={product.rating}
                        />
                    ))) : (
                      <div className="col-span-full bg-white p-20 text-center rounded-sm">
                            <h2 className="text-2xl font-bold">No results found for "{searchQuery}"</h2>
                            <p className="text-gray-500 mt-2">Try searching for "Watch", "TV", or "Samsung".</p>
                            <button 
                                onClick={() => window.location.href="/"}
                                className="mt-4 text-blue-500 hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;