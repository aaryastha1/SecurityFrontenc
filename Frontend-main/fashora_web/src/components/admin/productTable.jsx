


import React, { useState } from 'react'
import { useAdminProduct, useDeleteOneProduct } from '../../hooks/admin/userAdminProduct'
import { useNavigate, Link } from 'react-router-dom'
import { getBackendImageUrl } from '../../utilis/backendImage'
import DeleteModal from '../auth/deleteModal'
import { FaEdit, FaEye, FaTrash, FaPlus } from 'react-icons/fa'

export default function ProductTable() {
  const navigate = useNavigate()
  const {
    error,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canNextPage,
    canPreviousPage,
    search,
    setSearch,
    refetch,
  } = useAdminProduct()

  const deleteProductHook = useDeleteOneProduct()
  const [deleteId, setDeleteId] = useState(null)

  const handlePrev = () => canPreviousPage && setPageNumber((prev) => prev - 1)
  const handleNext = () => canNextPage && setPageNumber((prev) => prev + 1)

  const handleSearch = (e) => {
    setPageNumber(1)
    setSearch(e.target.value)
  }

  const handleDelete = () => {
    deleteProductHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null)
      },
    })
  }

  if (error) return <div className="p-6 text-red-500">{error.message}</div>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this product?"
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          🛒 Product Management
        </h1>
        <p className="text-gray-500 mt-1">Manage your product listings</p>
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm text-gray-700">Search:</label>
        <input
          className="border border-gray-300 rounded px-3 py-2 text-sm w-1/3 shadow-sm focus:outline-none focus:ring"
          onChange={handleSearch}
          value={search}
          placeholder="Search products..."
        />
        <Link to="/admins/product/create" className="ml-auto">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md text-sm font-medium">
            <FaPlus /> Add Product
          </button>
        </Link>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-[1.01] relative"
          >
            <img
              src={getBackendImageUrl(product.image, "product")}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-1">Price: Rs {product.price}</p>
              {product?.categoryId?.name && (
                <p className="text-gray-500 text-sm mb-2">Category: {product.categoryId.name}</p>
                
              )}
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>


              <div className="flex gap-2 mt-4">
                <Link to={`/admins/product/${product._id}`}>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
                    <FaEye /> View
                  </button>
                </Link>
                <Link to={`/admins/product/${product._id}/edit`}>
                  <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
                    <FaEdit /> Edit
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteId(product._id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={!canPreviousPage}
          className={`px-4 py-2 rounded text-white text-sm ${
            canPreviousPage ? 'bg-[#222740]' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Back
        </button>
        <span className="text-[#222740] font-medium">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={!canNextPage}
          className={`px-4 py-2 rounded text-white text-sm ${
            canNextPage ? 'bg-[#222740]' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

