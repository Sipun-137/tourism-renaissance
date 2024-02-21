import axios from "axios"
export const registerNewUser=async (FormData:any)=>{

    try {
        const response=await axios.post("/api/register",JSON.stringify(FormData)) 
        return response?.data
    } catch (e:any) {
        console.log("error",e)
    }
}