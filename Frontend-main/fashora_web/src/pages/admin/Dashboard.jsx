// import React from 'react';
// import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign, Eye, Heart } from 'lucide-react';

// const Dashboard = () => {
// //   const stats = [
// //     { title: 'Total Revenue', value: '$124,593', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-emerald-500' },
// //     { title: 'Total Orders', value: '1,429', change: '+8.2%', trend: 'up', icon: ShoppingCart, color: 'bg-blue-500' },
// //     { title: 'Active Products', value: '2,156', change: '+3.1%', trend: 'up', icon: Package, color: 'bg-purple-500' },
// //     { title: 'Total Customers', value: '5,647', change: '-2.4%', trend: 'down', icon: Users, color: 'bg-pink-500' }
// //   ];

// //   const recentOrders = [
// //     { id: '#3201', customer: 'Sarah Johnson', amount: '$299.99', status: 'completed', product: 'Designer Dress' },
// //     { id: '#3202', customer: 'Mike Chen', amount: '$149.50', status: 'processing', product: 'Casual Sneakers' },
// //     { id: '#3203', customer: 'Emma Wilson', amount: '$89.99', status: 'shipped', product: 'Summer Top' },
// //     { id: '#3204', customer: 'David Brown', amount: '$199.99', status: 'pending', product: 'Leather Jacket' },
// //     { id: '#3205', customer: 'Lisa Garcia', amount: '$79.99', status: 'completed', product: 'Denim Jeans' }
// //   ];

// //   const topProducts = [
// //     { name: 'Designer Evening Dress', sales: 142, revenue: '$42,600', trend: '+15%' },
// //     { name: 'Casual Sneakers', sales: 98, revenue: '$14,700', trend: '+8%' },
// //     { name: 'Leather Handbag', sales: 76, revenue: '$22,800', trend: '+12%' },
// //     { name: 'Summer Collection Top', sales: 65, revenue: '$5,850', trend: '+5%' }
// //   ];

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'completed': return 'bg-emerald-100 text-emerald-800';
// //       case 'processing': return 'bg-blue-100 text-blue-800';
// //       case 'shipped': return 'bg-purple-100 text-purple-800';
// //       case 'pending': return 'bg-orange-100 text-orange-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your fashion store.</p>
//         </div>
//         <div className="flex space-x-3">
//           <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Export</button>
//           <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Add Product</button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map(stat => {
//           const Icon = stat.icon;
//           return (
//             <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                   <div className="flex items-center mt-2">
//                     {stat.trend === 'up' ? (
//                       <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
//                     ) : (
//                       <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//                     )}
//                     <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
//                       {stat.change}
//                     </span>
//                   </div>
//                 </div>
//                 <div className={`${stat.color} p-3 rounded-lg`}>
//                   <Icon className="h-6 w-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Recent Orders and Top Products */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="p-6 border-b border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
//           </div>
//           <div className="p-6 space-y-4">
//             {recentOrders.map(order => (
//               <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-3">
//                     <span className="font-medium text-gray-900">{order.id}</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">{order.customer} • {order.product}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-gray-900">{order.amount}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="p-6 border-b border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
//           </div>
//           <div className="p-6 space-y-4">
//             {topProducts.map((product, index) => (
//               <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                     <span className="text-sm font-semibold text-purple-600">#{index + 1}</span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900">{product.name}</p>
//                     <p className="text-sm text-gray-600">{product.sales} sales</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-gray-900">{product.revenue}</p>
//                   <p className="text-sm text-emerald-600">{product.trend}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
//             <Package className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
//             <span className="text-sm font-medium text-purple-900">Add Product</span>
//           </button>
//           <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
//             <Eye className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
//             <span className="text-sm font-medium text-blue-900">View Analytics</span>
//           </button>
//           <button className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors group">
//             <ShoppingCart className="h-8 w-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
//             <span className="text-sm font-medium text-emerald-900">Process Orders</span>
//           </button>
//           <button className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group">
//             <Heart className="h-8 w-8 text-pink-600 mb-2 group-hover:scale-110 transition-transform" />
//             <span className="text-sm font-medium text-pink-900">Customer Care</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
