// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';
// import { Outlet } from 'react-router-dom';

// export default function MainLayout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />
//       <main className="max-h-screen ">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }


import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Make main grow and allow full content height */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
