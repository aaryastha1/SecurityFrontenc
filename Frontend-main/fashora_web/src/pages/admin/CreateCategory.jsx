import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateCategory } from '../../hooks/admin/userAdminCategory'

export default function CreateCategory() {
  const { mutate } = useCreateCategory()

  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      ),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append("name", values.name)
      if (values.image) formData.append("image", values.image)
      mutate(formData, {
        onSuccess: () => {
          formik.resetForm()
        },
      })
    },
  })

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Create Category</h2>
        <p className="text-gray-600 mb-8">Add a new category to organize your fashion products</p>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Category Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                Category Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter category name..."
                className={`w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  formik.touched.name && formik.errors.name ? "border-red-500" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-sm mt-2">{formik.errors.name}</p>
              )}
            </div>

            {/* Category Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Category Image</label>
              <label
                htmlFor="image"
                className={`flex flex-col items-center justify-center h-40 rounded-md border-2 border-dashed cursor-pointer ${
                  formik.touched.image && formik.errors.image ? "border-red-500" : "border-gray-300"
                } hover:border-indigo-500`}
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0]
                    if (file) formik.setFieldValue("image", file)
                  }}
                  onBlur={formik.handleBlur}
                />
                {!formik.values.image ? (
                  <div className="text-center text-gray-400">
                    <svg
                      className="mx-auto h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm">Drop your image here</p>
                    <p className="text-xs text-gray-500">or click to browse files</p>
                  </div>
                ) : (
                  <img
                    src={URL.createObjectURL(formik.values.image)}
                    alt="preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                )}
              </label>
              {formik.touched.image && formik.errors.image && (
                <p className="text-red-600 text-sm mt-2">{formik.errors.image}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:from-purple-500 hover:to-pink-600 transition"
            >
              + Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
