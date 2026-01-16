import { useState } from "react";
import { registerUserService } from "../services/authServices";
export const useRegisterUser =() => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const register = async (formData) => {
        //event handle function eg user button click
        setIsLoading(true)
        setData(null)
        setError(null)
        try{
            const response =await
            registerUserService(formData)
            setData(response)
            setError(response)
        }catch (err){
            setError(err)
            return null
        }finally{
            setIsLoading(false)
        }
    }
    return {
        register,
        isLoading,
        data,
        error
    }
}

