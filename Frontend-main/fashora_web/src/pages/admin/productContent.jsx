import ProductItem from '../../components/admin/productItem';

const products = [
  {
    name: 'Classic White T-Shirt',
    category: 'Casual Wear',
    price: 19.99,
  },
  {
    name: 'Blue Denim Jeans',
    category: 'Denim',
    price: 49.99,
  },
  {
    name: 'Leather Jacket',
    category: 'Outerwear',
    price: 149.99,
  },
];

export default function ProductContent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-sm text-gray-500">Manage products, categories, and inventory</p>
        </div>
        <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800">
          + Add Product
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-1 rounded bg-black text-white text-sm">Products</button>
        <button className="px-4 py-1 rounded bg-gray-100 text-sm text-gray-700">Categories</button>
        <button className="px-4 py-1 rounded bg-gray-100 text-sm text-gray-700">Inventory</button>
      </div>

      {/* Recent Products */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Recent Products</h2>
        {products.map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
