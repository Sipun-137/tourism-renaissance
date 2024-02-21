import axios from "axios"
export const loginUserData=async (FormData:any)=>{
    try {    
        const response=await axios.post("/api/login",JSON.stringify(FormData)) 
        return response.data
    } catch (e:any) {
        console.log("error",e)
    }
}