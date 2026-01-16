import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOneProduct } from '../../hooks/admin/userAdminProduct'

export default function ViewProduct() {
  const { id } = useParams()
  const { product, error, isPending } = useGetOneProduct(id)

  if (isPending) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
      <p><span className="font-medium">Name:</span> {product.name}</p>
      <p><span className="font-medium">Price:</span> ${product.price}</p>
      <p><span className="font-medium">Category:</span> {product?.categoryId?.name}</p>
      <p><span className="font-medium">Seller:</span> {product?.sellerId?.firstName}</p>
    </div>
  )
}
