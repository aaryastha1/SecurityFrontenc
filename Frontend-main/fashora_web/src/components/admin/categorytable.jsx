// import React, { useState } from 'react'
// import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/userAdminCategory'
// import { getBackendImageUrl } from '../../utilis/backendImage'
// import { Link } from 'react-router-dom'
// import DeleteModal from '../auth/deleteModal'
// import { FaEdit, FaEye, FaTrash, FaTags,FaPlus  } from 'react-icons/fa';

// function Welcome(props) {
//     return <h1>{props.name}</h1>
// }
// function NameCompoment({ name, age }) {
//     return <h1>{name} {age}</h1>
// }

// export default function CategoryTable() {
//     const { categories, error, isPending } = useAdminCategory()
//     const deleteCategoryHook = useDeleteOneCategory()
//     const [deleteId, setDeleteId] = useState(null)

//     const handleDelete = () => {
//         deleteCategoryHook.mutate(
//             deleteId,
//             {
//                 onSuccess: () => {
//                     setDeleteId(null)
//                 }
//             }
//         )
//     }
// return (
//   <div className="p-8 bg-gradient-to-br from-indigo-100 to-white min-h-screen">
//     <Welcome name="Welcome" />
//     {/* <NameCompoment name="Shyam" age="20" /> */}

//     <DeleteModal
//       isOpen={deleteId}
//       onClose={() => setDeleteId(null)}
//       onConfirm={handleDelete}
//       title="Delete Confirmation"
//       description="Are you sure you want to delete"
//     />

//     <div className="bg-white shadow-2xl rounded-3xl p-8 mt-8 transition-transform hover:scale-[1.01] duration-300">
//       <div className="flex items-center gap-3 mb-6">
//         <FaTags className="text-red-500 text-3xl" />
//         <h2 className="text-3xl font-extrabold text-gray-800">Category Table</h2>
//       </div>
//       <Link to="/admins/categoryy/create">
//             <button
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md"
//               title="Add Category"
//             >
//               <FaPlus className="text-white" /> Add
//             </button>
//           </Link>

//       <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
//         <table className="min-w-full table-auto rounded-xl overflow-hidden">
//           <thead className="bg-red-500 text-white text-sm uppercase">
//             <tr>
//               <th className="py-4 px-6 text-left">Name</th>
//               <th className="py-4 px-6 text-left">Image</th>
//               <th className="py-4 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
//             {categories.map((row) => (
//               <tr key={row._id} className="hover:bg-indigo-50 transition duration-200">
//                 <td className="py-4 px-6 font-medium">{row.name}</td>
//                 <td className="py-4 px-6">
//                   <img
//                     className="w-16 h-16 rounded-xl border shadow-sm object-cover"
//                     src={getBackendImageUrl(row.filepath)}
//                     alt={row.name}
//                   />
//                 </td>
//                 <td className="py-4 px-6">
//                   <div className="flex gap-3">
//                     <Link to={`/admins/categoryy/${row._id}`}>
//                       <button
//                         title="View"
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
//                       >
//                         <FaEye /> View
//                       </button>
//                     </Link>
//                     <Link to={`/admins/categoryy/${row._id}/edit`}>
//                       <button
//                         title="Edit"
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                     </Link>


//                     <button
//                       onClick={() => setDeleteId(row._id)}
//                       title="Delete"
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// );
// }


import React, { useState } from 'react';
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/userAdminCategory';
import { getBackendImageUrl } from '../../utilis/backendImage';
import { Link } from 'react-router-dom';
import DeleteModal from '../auth/deleteModal';
import { FaEdit, FaEye, FaTrash, FaTags, FaPlus } from 'react-icons/fa';

export default function CategoryTable() {
  const { categories, error, isPending } = useAdminCategory();
  const deleteCategoryHook = useDeleteOneCategory();
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Delete handler
  const handleDelete = () => {
    deleteCategoryHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  // Filter categories based on search term (case-insensitive)
  const filteredCategories = searchTerm
    ? categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this category?"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaTags className="text-purple-600" /> Category Management
        </h1>
        <p className="text-gray-500 mt-1">Organize and manage your product categories</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-xl w-1/3 shadow-sm focus:outline-none focus:ring"
        />
        <button className="px-4 py-2 border rounded-xl text-sm text-gray-700 flex items-center gap-2 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
          </svg>
          All Status
        </button>
        <Link to="/admins/categoryy/create" className="ml-auto">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md text-sm font-medium">
            <FaPlus /> Add Category
          </button>
        </Link>
      </div>

      {error && <div className="text-red-500 mb-4">{error.message || 'Error loading categories.'}</div>}
      {isPending && <div>Loading categories...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No categories found.
          </div>
        )}

        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-[1.01] relative"
          >
                <img
        src={getBackendImageUrl(category.filepath, "category")} // for category
        alt={category.name}
        className="h-40 w-full object-cover"
      />

            <div
              className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                category.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              {category.status}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{category.name}</h3>

              <div className="flex gap-2">
                <Link to={`/admins/categoryy/${category._id}`}>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
                    <FaEye /> View
                  </button>
                </Link>
                <Link to={`/admins/categoryy/${category._id}/edit`}>
                  <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
                    <FaEdit /> Edit
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteId(category._id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
