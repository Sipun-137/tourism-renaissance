import axios from "axios"
import Cookies from 'js-cookie'

export const AddBlog=async(formData:any)=>{
    try {
        const response =await axios.post("/api/blog/add-post",formData,{
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const GetAllBlog=async(id:string)=>{
    try{
        const response=await axios.get(`/api/blog/get-all-data?id=${id}`,{
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}


export const DeleteBlog=async(id:string)=>{
    try {
        const response=await axios.delete(`/api/blog/delete-blog?id=${id}`,{
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// export const 