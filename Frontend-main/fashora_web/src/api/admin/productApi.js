

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