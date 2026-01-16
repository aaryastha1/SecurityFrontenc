// import axios from "../api";

// // GET all products (with pagination & search support)
// export const getAllProductApi = (params) =>
//   axios.get("/admin/product", { params });

// // CREATE one product (multipart/form-data for file upload)
// export const createOneProductApi = (data) =>
//   axios.post("/admin/product", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

// // UPDATE one product (e.g., with image)
// export const updateOneProductApi = (id, data) =>
//   axios.put(`/admin/product/${id}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

// // GET one product by ID
// export const getOneProductApi = (id) =>
//   axios.get(`/admin/product/${id}`);

// // DELETE one product
// export const deleteOneProductApi = (id) =>
//   axios.delete(`/admin/product/${id}`);


import axios from "../api";

// Get all products with optional query params (pagination, search, etc.)
export const getAllProductApi = (params) => 
    axios.get("/admin/product", { params });

// Get a single product by ID
export const getOneProductApi = (id) => 
    axios.get("/admin/product/" + id);


export const createOneProductApi = (data) =>
    axios.post("/admin/product", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
)


export const updateOneProductApi = (id, data) =>
    axios.put(`/admin/product/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });


export const deleteOneProductApi = (id) =>
    
    axios.delete("/admin/product/" + id)