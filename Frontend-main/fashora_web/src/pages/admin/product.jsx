// import React, { useState } from 'react';
// import { Plus, Search, Filter, Edit, Trash2, Eye, Star, Package } from 'lucide-react';

// const Products = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const products = [
//     {
//       id: 1,
//       name: 'Dress',
//       category: 'Dresses',
//       price: 1500,
//       status: 'active',
//       image: 'https://i.pinimg.com/736x/15/b1/ef/15b1efc12e40416b09bda0c98af35f8d.jpg',
  
//     },
//     {
//       id: 2,
//       name: 'Basic Tee',
//       category: 'Tops',
//       price: 900,
   
//       status: 'active',
//       image: 'https://i.pinimg.com/736x/c3/31/6e/c3316e69c9fdc9d76f86ae15c1bdda37.jpg',
  
//     },
//     {
//       id: 3,
//       name: 'premuim sweater',
//       category: 'Sweater',
//       price: 2500,
    
//       status: 'low_stock',
//       image: 'https://www.knitcroaddict.com/wp-content/uploads/2022/11/Knitted-sweater-pattern-5.png',
 
//     },
//     {
//       id: 4,
//       name: 'Linen Pant',
//       category: 'Pant',
//       price: 1000,
   
//       status: 'out_of_stock',
//       image: 'https://i.pinimg.com/736x/bd/f3/25/bdf32500b344f9f36abaf3f5c828b758.jpg',
 
//     },
//     {
//       id: 5,
//       name: 'basic Tee',
//       category: 'Tees',
//       price: 1199,
//       status: 'active',
//       image: 'https://i.pinimg.com/736x/8b/9c/6d/8b9c6dc820babcb63656839566caace3.jpg',
  
//     }
//   ];

//   const categories = ['all', 'Dresses', 'Pant', 'Sweater', 'Tees', ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       // case 'active': return 'bg-emerald-100 text-emerald-800';
//       // case 'low_stock': return 'bg-orange-100 text-orange-800';
//       // case 'out_of_stock': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       // case 'active': return 'Active';
//       // case 'low_stock': return 'Low Stock';
//       // case 'out_of_stock': return 'Out of Stock';
//       default: return status;
//     }
//   };

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//           <p className="text-gray-600 mt-1">Manage your fashion inventory and product catalog.</p>
//         </div>
//         <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
//           <Plus className="h-5 w-5 mr-2" />
//           Add Product
//         </button>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>
//           <div className="flex items-center space-x-4">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category}
//                 </option>
//               ))}
//             </select>
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
//               <Filter className="h-4 w-4 mr-2" />
//               Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
//             <div className="relative">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute top-2 right-2">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
//                   {getStatusText(product.status)}
//                 </span>
//               </div>
//               <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
//                 {/* {product.sales} sold */}
//               </div>
//             </div>
            
//             <div className="p-4">
//               <div className="flex items-start justify-between mb-2">
//                 <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
//                   {product.name}
//                 </h3>
//               </div>
              
//               <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              
//               <div className="flex items-center mb-3">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       // className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                     />
//                   ))}
//                   {/* <span className="text-sm text-gray-600 ml-1">({product.rating})</span> */}
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-xl font-bold text-gray-900">Rs{product.price}</span>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Package className="h-4 w-4 mr-1" />
//                   {/* {product.stock} in stock */}
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
//                   <Edit className="h-4 w-4 mr-1" />
//                   Edit
//                 </button>
//                 <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                   <Eye className="h-4 w-4" />
//                 </button>
//                 <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <div className="text-center py-12">
//           <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//           <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;


import { useEffect, useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiMoreVertical, FiStar } from "react-icons/fi";
import instance from "../../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    instance.get("/product")
      .then(res => {
        setProducts(res.data.data || []);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-80"
        />
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  {/* <img
                    src={`http://localhost:5006/${p.productImage}`}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded"
                  /> */}
                  <div>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-gray-400 text-xs">PRD-{String(i + 1).padStart(3, "0")}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                    {p.categoryId?.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">${p.price}</td>
                <td className={`px-6 py-4 font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 10 ? 'text-yellow-500' : 'text-green-600'}`}>
                  {p.stock ?? 0}
                </td>
                <td className="px-6 py-4 flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  <span>{p.rating ?? "4.5"}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {p.stock === 0 ? 'out_of_stock' : 'active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center relative">
                  <div className="group relative inline-block">
                    <FiMoreVertical className="cursor-pointer text-gray-600" />
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10 hidden group-hover:block">
                      <button className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                        <FiEye className="mr-2" /> View
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                        <FiEdit2 className="mr-2" /> Edit
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

