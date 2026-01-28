


import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';

const mustHaveProducts = [
  { model: '', name: 'Basic Fitted Top', Rs: '1999', image: 'top1.png' },
  { model: '', name: 'Off Shoulder Top in black', Rs: '2499', image: 'image4.png' },
  { model: '', name: 'Fitted Top', Rs: '1799', image: 'fitted.jpg' },
  { model: '', name: 'Dresses', Rs: '2999', image: 'dress3.jpg' },
  { model: '', name: 'Blue Top', Rs: '1499', image: 'blue top.jpg' },
  { model: '', name: 'Yellow Shirt', Rs: '1999', image: 'Yellow shirt.jpg' },
  { model: '', name: 'Pink Top', Rs: '1699', image: 'top2.jpg' },
];

export default function HomePage() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      const scrollAmount = 260;
      carouselRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const calculateTimeLeft = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(9, 13, 43, 0);

    const diff = targetDate - new Date();
    if (diff <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    return {
      days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll top on Explore Now button click
  const handleExploreNow = () => {
    navigate('/category/Tops');
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[700px]">
          <img
            src="girl.png"
            alt="Woman wearing spring collection dress posing outdoors"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-6 md:px-16">
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              The Spring Collection
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4 max-w-md">
              Discover the latest trends and elevate your style with fresh spring arrivals.
            </p>
            <button
              onClick={handleExploreNow}
              className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition focus:outline focus:outline-2 focus:outline-blue-500"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="text-gray-600 text-sm my-4 px-6 md:px-16">
          <ol className="flex gap-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li>/</li>
            <li aria-current="page" className="text-gray-800 font-semibold">Spring Collection</li>
          </ol>
        </nav>

        {/* Spring Must-Haves */}
        <section className="max-w-10xl mx-auto px-7 pt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-800">
              The Spring Must-Haves
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
                className="bg-white text-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline focus:outline-2 focus:outline-blue-500"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll right"
                className="bg-white text-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline focus:outline-2 focus:outline-blue-500"
              >
                →
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            onWheel={(e) => {
              e.preventDefault();
              if (carouselRef.current) {
                carouselRef.current.scrollLeft += e.deltaY;
              }
            }}
            role="region"
            aria-label="Spring must-have products carousel"
          >
            {mustHaveProducts.map((product, i) => (
              <div
                key={i}
                className="relative min-w-[240px] max-w-[240px] bg-white rounded-lg shadow border flex-shrink-0 snap-start"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  {product.model && (
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      {product.model}
                    </p>
                  )}
                  <p className="text-base font-semibold text-gray-900 leading-tight">
                    {product.name}
                  </p>
                  {product.Rs && (
                    <p className="text-xs text-gray-500 mt-1">Rs. {product.Rs}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search input for accessibility */}
        <div className="my-6 max-w-md mx-auto px-6 md:px-16">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products"
          />
        </div>

        {/* Marquee */}
        <div
          className="w-full bg-[#744f28] text-white py-2 mt-10 overflow-hidden"
          aria-label="Scrolling text: motivational quote"
        >
          <div className="whitespace-nowrap animate-marquee text-xs font-semibold tracking-wide">
            TRAIN HARDER. LOOK SHARPER. GEAR THAT KEEPS UP WITH YOUR GRIND • TRAIN HARDER. LOOK SHARPER. GEAR THAT KEEPS UP WITH YOUR GRIND
          </div>
        </div>

        {/* Sale Banner Section */}
        <section className="w-full mt-12 bg-[#fef9f5]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl min-h-[500px]">
            {/* LEFT */}
            <div className="flex flex-col justify-center items-center px-6 py-10 md:px-16 bg-gradient-to-br from-[#f8e7dc] to-[#f3e2d5]">
              <div className="flex justify-center w-full mb-4">
                <div className="bg-[#744f28] text-white text-xs uppercase px-3 py-1 rounded">
                  Limited Time
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-[#2d1a0c] mb-4 leading-tight">
                  Exclusive Offer
                </h2>
                <p className="text-gray-700 text-lg mb-6 max-w-md">
                  TriaFash’s Best-Seller Embodies Timeless Style.
                </p>

                <div className="flex justify-center space-x-4 mb-6">
                  {[
                    { label: 'DAYS', value: timeLeft.days },
                    { label: 'HOURS', value: timeLeft.hours },
                    { label: 'MIN', value: timeLeft.minutes },
                    { label: 'SEC', value: timeLeft.seconds },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white px-4 py-3 rounded-lg shadow text-center w-20"
                    >
                      <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                      <span className="block text-xs text-gray-500 uppercase">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/category/Offers')}
                  className="bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide transition-all duration-200 focus:outline focus:outline-2 focus:outline-blue-500"
                >
                  Shop Now →
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative bg-white flex items-center justify-center">
              <img
                src="modelss.jpg"
                alt="Model showcasing latest spring fashion outfit"
                className="w-full h-full object-contain max-h-[500px] p-6"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Optional Footer */}
      {/* <Footer /> */}

      {/* Styles */}
      <style>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
