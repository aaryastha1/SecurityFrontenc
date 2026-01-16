


// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Login from '../pages/login';
// import Register from '../pages/Register';
// import HomePage from '../pages/Dashboard';
// import MainLayout from '../layout/MainLayout';
// import AuthContextProvider from '../auth/authProvider';
// import Homepage from "../pages/Homepage";

// import AdminLayout from '../layout/admin/adminlayout';
// import Products from '../pages/admin/product';
// import Categories from '../pages/admin/categories';
// import CategoryManagement from '../pages/admin/CategoryManagement';
// import ViewCategory from '../pages/admin/ViewCategory';
// import UpdateCategory from '../pages/admin/updateCategory';
// import CreateCategory from '../pages/admin/CreateCategory';
// import UserManagement from '../pages/admin/UserManagement';
// import ProductContent from '../pages/admin/productContent';
// import ProductTable from '../components/admin/productTable';
// import ProductDetail from '../pages/admin/productDetails';
// import CreateProduct from '../pages/admin/CreateProduct';
// import UpdateProduct from '../pages/admin/UpdateProduct';
// import CategoryProductPage from '../pages/Categoryproduct';
// import FavoritesPage from '../pages/Favoritespage';

// import { CartProvider } from '../context/cartcontext';
// import CartPage from '../pages/CartPage';

// export default function AppRouter() {
//   return (
//     <AuthContextProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             {/* Public routes inside MainLayout */}
//             <Route element={<MainLayout />}>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/dashboard" element={<HomePage />} />
//               <Route path="/home" element={<Homepage />} />

//               {/* Category route */}
//               <Route path="/category/:categoryName" element={<CategoryProductPage />} />
//               <Route path="/favorites" element={<FavoritesPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             </Route>

//             <Route path="categories" element={<Categories />} />

//             <Route element={<AdminLayout />}>
//               <Route path='/admins/*'>
//                 <Route path='categoryy' element={<CategoryManagement />} />
//                 <Route path='categoryy/:id' element={<ViewCategory />} />
//                 <Route path='categoryy/:id/edit' element={<UpdateCategory />} />
//                 <Route path='categoryy/create' element={<CreateCategory />} />

//                 <Route path='Products' element={<ProductContent />} />
//                 <Route path='Product' element={<ProductTable />} />
//                 <Route path="product/:id" element={<ProductDetail />} />
//                 <Route path="product/create" element={<CreateProduct />} />
//                 <Route path="product/:id/edit" element={<UpdateProduct />} />

//                 <Route path='userss' element={<UserManagement />} />
//               </Route>
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </AuthContextProvider>
//   );
// }



import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from '../pages/login';
import Register from '../pages/Register';
import HomePage from '../pages/Dashboard';
import MainLayout from '../layout/MainLayout';
import AuthContextProvider from '../auth/authProvider';
import Homepage from "../pages/Homepage";

import AdminLayout from '../layout/admin/adminlayout';
import Products from '../pages/admin/product';
import Categories from '../pages/admin/categories';
import CategoryManagement from '../pages/admin/CategoryManagement';
import ViewCategory from '../pages/admin/ViewCategory';
import UpdateCategory from '../pages/admin/updateCategory';
import CreateCategory from '../pages/admin/CreateCategory';
import UserManagement from '../pages/admin/UserManagement';
import ProductContent from '../pages/admin/productContent';
import ProductTable from '../components/admin/productTable';
import ProductDetail from '../pages/admin/productDetails';
import CreateProduct from '../pages/admin/CreateProduct';
import UpdateProduct from '../pages/admin/UpdateProduct';
import CategoryProductPage from '../pages/Categoryproduct';
import FavoritesPage from '../pages/Favoritespage';

import { CartProvider } from '../context/cartcontext';
import CartPage from '../pages/CartPage';
import SearchResultsPage from '../pages/searchresultPage';
import ProfilePage from '../pages/profilePage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccess from '../pages/ordersuccess';
import AdminOrderPage from '../pages/admin/adminOrderPage';



export default function AppRouter() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes inside MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/home" element={<Homepage />} />

              {/* Category route */}
              <Route path="/category/:categoryName" element={<CategoryProductPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<SearchResultsPage />} />
                 <Route path="/profile" element={<ProfilePage />} />
                 <Route path="/checkout" element={<CheckoutPage />} />
                 <Route path="/order-success" element={<OrderSuccess />} />



            
                  {/* Search results */}
     


              {/* Categories route moved inside MainLayout for consistent layout */}
              <Route path="/categories" element={<Categories />} />
            </Route>

            {/* Admin routes inside AdminLayout */}
            <Route element={<AdminLayout />}>
              {/* Redirect /admins to /admins/categoryy */}
              <Route path="/admins" element={<Navigate to="/admins/categoryy" replace />} />
              
              <Route path="/admins/*">
                <Route path="categoryy" element={<CategoryManagement />} />
                <Route path="categoryy/:id" element={<ViewCategory />} />
                <Route path="categoryy/:id/edit" element={<UpdateCategory />} />
                <Route path="categoryy/create" element={<CreateCategory />} />

                <Route path="products" element={<ProductContent />} />
                <Route path="product" element={<ProductTable />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="product/create" element={<CreateProduct />} />
                <Route path="product/:id/edit" element={<UpdateProduct />} />
                <Route path="orders" element={<AdminOrderPage />} />

                <Route path="userss" element={<UserManagement />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthContextProvider>
  );
}
