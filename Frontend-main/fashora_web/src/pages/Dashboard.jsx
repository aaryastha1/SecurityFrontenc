



// import React, { useRef, useState, useEffect } from 'react';

// const mustHaveProducts = [
//   { model: 'Just in', name: 'Basic Fitted Top', code: 'No. 1999', image: 'top1.png' },
//   { model: 'Just in', name: 'Pink Cotton Shirt', code: 'No. 1405', image: 'shirt.png' },
//   { model: 'Just in', name: 'Cotton Loose Pant', code: 'No. 1999', image: 'pant.png' },
//   { model: 'Just in', name: 'Off Shoulder Top in black', code: 'No. 1492', image: 'image4.png' },
//   { model: 'Just in', name: 'tee', code: 'No. 1492', image: 'tee.png' },
//   { model: 'Just in', name: 'sweater', code: 'No. 1491', image: 'image.png' },
//   { model: 'Just in', name: 'Off Shoulder Top in black', code: 'No. 1492', image: 'image4.png' },
// ];

// export default function HomePage() {
//   const carouselRef = useRef(null);
//   const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 9, minutes: 15, seconds: 30 });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
//         else if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
//         else if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
//         else if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
//         return prev;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const scrollCarousel = (dir) => {
//     if (carouselRef.current) {
//       const scrollAmount = 260;
//       carouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="w-full bg-white text-gray-700 min-h-screen flex flex-col">
//       {/* Hero Section */}
//       <div className="w-full">
//         <img src="girl.png" alt="Hero" className="w-full h-full object-cover object-top block" />
//       </div>

//       {/* Section Title and Carousel Controls */}
//       <div className="max-w-7xl mx-auto px-4 pt-8 flex items-center justify-between">
//         <h2 className="text-lg md:text-xl font-bold tracking-tight">THE SPRING MUST-HAVES</h2>
//         <div className="flex gap-2">
//           {/* <button onClick={() => scrollCarousel('left')} className="bg-gray-100 p-2 rounded hover:bg-gray-200">
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button onClick={() => scrollCarousel('right')} className="bg-[#e6b18a] p-2 rounded hover:bg-[#d6a97a]">
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M9 5l7 7-7 7" />
//             </svg>
//           </button> */}
//         </div>
//       </div>

//       {/* Scrollable Product Carousel */}
//       <div className="max-w-8xl mx-auto px-4 mt-2 overflow-x-auto scrollbar-hide">
//         <div
//           ref={carouselRef}
//           className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
//           onWheel={(e) => {
//             if (carouselRef.current) {
//               e.preventDefault();
//               carouselRef.current.scrollLeft += e.deltaY;
//             }
//           }}
//         >
//           {mustHaveProducts.map((product, i) => (
//             <div key={i} className="relative min-w-[220px] max-w-[220px] bg-white rounded-lg shadow border flex-shrink-0 snap-start">
//               <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-gray-100 z-10">
//                 <svg width="20" height="20" fill="none" stroke="#744f28" strokeWidth="2" viewBox="0 0 24 24">
//                   <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
//                 </svg>
//               </button>
//               <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
//               <div className="p-3">
//                 <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.model}</p>
//                 <p className="text-base font-semibold text-gray-900 leading-tight">{product.name}</p>
//                 <p className="text-xs text-gray-500 mt-1">{product.code}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Marquee */}
//       <div className="w-full bg-[#744f28] text-white py-1.5 mt-8 overflow-hidden">
//         <div className="whitespace-nowrap animate-marquee text-xs font-semibold tracking-wide">
//           TRAIN HARDER. LOOK SHARPER. GEAR THAT KEEPS UP WITH YOUR GRIND &nbsp; • &nbsp; TRAIN HARDER. LOOK SHARPER. GEAR THAT KEEPS UP WITH YOUR GRIND
//         </div>
//       </div>

//       {/* Sale Section */}
//       <div className="w-full mt-10 px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-white">
//           {/* Left */}
//           <div className="bg-gradient-to-br from-[#f5ede6] to-[#ede0d3] flex flex-col justify-center p-8 lg:p-12 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-[#744f28] opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#744f28] opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
//             <div className="text-center flex flex-col items-center justify-center relative z-10">
//               <div className="inline-block px-4 py-2 bg-[#744f28] text-white text-sm font-medium rounded-full mb-4 uppercase tracking-wider">Limited Time</div>
//               <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-800 leading-tight">Exclusive Offer</h2>
//               <p className="text-gray-600 mb-8 text-lg max-w-md leading-relaxed">TriaFash's Best-Seller Embodies Timeless Style</p>
//             </div>
//             <div className="flex justify-center gap-4 mb-8">
//               {[{ value: timeLeft.days, label: 'Days' }, { value: timeLeft.hours, label: 'Hours' }, { value: timeLeft.minutes, label: 'Min' }, { value: timeLeft.seconds, label: 'Sec' }].map((item, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <div className="bg-white rounded-xl shadow-lg p-3 min-w-[60px] border border-[#744f28]/10">
//                     <span className="text-2xl lg:text-3xl font-bold text-[#744f28] block text-center">{item.value.toString().padStart(2, '0')}</span>
//                   </div>
//                   <span className="text-xs font-medium text-gray-600 mt-2 uppercase tracking-wide">{item.label}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col items-center">
//               <button className="group bg-[#744f28] hover:bg-[#5c3b1f] text-white px-10 py-4 rounded-full transition-all duration-300 uppercase tracking-wider font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
//                 <span className="flex items-center gap-2">
//                   Shop Now
//                   <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </span>
//               </button>
//               <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
//                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                 </svg>
//                 Secure checkout
//               </p>
//             </div>
//           </div>
//           {/* Right */}
//           <div className="bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 lg:p-8 relative">
//             <div className="relative group">
//               <div className="relative bg-white rounded-2xl shadow-xl p-4 transform transition-transform duration-300 group-hover:scale-105">
//                 <img src="image1.png" alt="Fashion Model" className="object-cover rounded-xl w-full h-auto max-w-[280px] max-h-[380px]" />
//                 <div className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">50% OFF</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .animate-marquee {
//           display: inline-block;
//           animation: marquee 18s linear infinite;
//         }
//         @keyframes marquee {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-50%); }
//         }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }




import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';

const mustHaveProducts = [
  { model: '', name: 'Basic Fitted Top', Rs: '1999', image: 'top1.png' },
  { model: '', name: 'Off Shoulder Top in black', image: 'image4.png' },
  { model: '', name: 'FittedTop', image: 'fitted.jpg' },
   { model: '', name: 'Dresses', image: 'dress3.jpg' },
    { model: '', name: 'Top', image: 'blue top.jpg' },
     { model: '', name: 'Yellow Shirt', image: 'Yellow shirt.jpg' },
      { model: '', name: 'Pink Top', image: 'top2.jpg' },
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

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[700px]">
          <img src="girl.png" alt="Hero" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-6 md:px-16">
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
              The Spring Collection
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg mb-4 max-w-md">
              Discover the latest trends and elevate your style with fresh spring arrivals.
            </p>
           <button
            onClick={() => navigate('/category/Tops')}
            className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Explore Now
          </button>

          </div>
        </div>

        {/* Spring Must-Haves */}
        <section className="max-w-10xl mx-auto px-7 pt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-800">The Spring Must-Haves</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className="bg-white text-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="bg-white text-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
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
              carouselRef.current.scrollLeft += e.deltaY;
            }}
          >
            {mustHaveProducts.map((product, i) => (
              <div
                key={i}
                className="relative min-w-[240px] max-w-[240px] bg-white rounded-lg shadow border flex-shrink-0 snap-start"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-3">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.model}</p>
                  <p className="text-base font-semibold text-gray-900 leading-tight">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.code}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marquee */}
        <div className="w-full bg-[#744f28] text-white py-2 mt-10 overflow-hidden">
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
                  className="bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide transition-all duration-200"
                >
                  Shop Now →
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative bg-white flex items-center justify-center">
              <img
                src="modelss.jpg"
                alt="Model"
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
