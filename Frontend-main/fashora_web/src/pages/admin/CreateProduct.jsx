

// import React, { useState } from 'react';
// import { useCreateProduct } from '../../hooks/admin/userAdminProduct';
// import { useAdminCategory } from '../../hooks/admin/userAdminCategory';

// export default function CreateProduct() {
//   const { categories } = useAdminCategory();
//   const createProduct = useCreateProduct();

//   const [form, setForm] = useState({
//     name: '',
//     price: '',
//     categoryId: '',
//     image: null,
//     description: '',   // Added description here
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate all required fields before submitting
//     if (!form.name || !form.price || !form.categoryId || !form.image) {
//       alert('Please fill all required fields and select an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', form.name);
//     formData.append('price', form.price);
//     formData.append('categoryId', form.categoryId);
//     formData.append('image', form.image);
//     formData.append('description', form.description);  // Append description

//     // IMPORTANT: Replace this with a valid ObjectId string from your DB or auth
//     formData.append('userId', '64a7a8d20e0a5b1234567890');

//     createProduct.mutate(formData);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-xl">
//       <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//         />
//         <select
//           name="categoryId"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           required
//           defaultValue=""
//         >
//           <option value="" disabled>Select Category</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
//         </select>

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Product Description"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           value={form.description}
//           rows={4}
//         />

//         <input
//           type="file"
//           name="image"
//           className="w-full border p-2 rounded"
//           onChange={handleChange}
//           accept="image/*"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600"
//         >
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useCreateProduct } from '../../hooks/admin/userAdminProduct';
import { useAdminCategory } from '../../hooks/admin/userAdminCategory';

export default function CreateProduct() {
  const { categories } = useAdminCategory();
  const createProduct = useCreateProduct();

  const [form, setForm] = useState({
    name: '',
    price: '',
    categoryId: '',
    image: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.categoryId || !form.image) {
      alert('Please fill all required fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('categoryId', form.categoryId);
    formData.append('image', form.image);
    formData.append('description', form.description);
    formData.append('userId', '64a7a8d20e0a5b1234567890');

    createProduct.mutate(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Create Product</h2>
        <p className="text-gray-600 mb-8">Add a new product to your fashion store</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.name}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Price (NPR)
              </label>
              <input
                type="number/test"
                name="price"
                placeholder="Enter price..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.price}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="categoryId"
                className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.categoryId}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center h-36 rounded-md border-2 border-dashed cursor-pointer border-gray-300 hover:border-indigo-500"
              >
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                  required
                />
                {!form.image ? (
                  <div className="text-center text-gray-400">
                    <svg
                      className="mx-auto h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    <p className="mt-1 text-sm">Drop your image here</p>
                    <p className="text-xs text-gray-500">or click to upload</p>
                  </div>
                ) : (
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="preview"
                    className="h-28 w-28 object-cover rounded-md"
                  />
                )}
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description..."
              rows={4}
              className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={form.description}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:from-purple-500 hover:to-pink-600 transition"
            >
              + Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
