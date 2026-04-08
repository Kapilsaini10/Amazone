import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <div className="relative">
        {/* Gradient Overlay to blend with the product list */}
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
        
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >
            <div>
                <img loading="lazy" src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" alt="Banner 1" />
            </div>
            <div>
                <img loading="lazy" src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg" alt="Banner 2" />
            </div>
            <div>
                <img loading="lazy" src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg" alt="Banner 3" />
            </div>
        </Carousel>
    </div>
  )
}

export default Banner