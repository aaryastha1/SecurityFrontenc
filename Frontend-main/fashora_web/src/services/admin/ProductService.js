
import { getAllProductApi, getOneProductApi, deleteOneProductApi, updateOneProductApi, createOneProductApi } from "../../api/admin/productApi";

export const getAllProductService = async (params) => {
  try {
    const response = await getAllProductApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product fetch failed" };
  }
};

export const getOneProductService = async (id) => {
  try {
    const response = await getOneProductApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Get failed" };
  }
};



export const deleteOneProductService = async (id) => {
    try{
        const response = await deleteOneProductApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || { "message": "Delete failed" }
    }
}

export const updateOneProductService = async (id, data)=>{
    try{
        const response = await updateOneProductApi(id, data)
        return response.data
    }catch(err){
        throw err.response?.data || { "message" : "Update failed"}
    }
}

export const createOneProductService = async (formData) => {
  try {
    const response = await createOneProductApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Create failed" };
  }
};