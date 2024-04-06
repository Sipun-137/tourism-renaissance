import axios from "axios"
export const loginUserData=async (FormData:any)=>{
    try {    
        const response=await axios.post("/api/login",JSON.stringify(FormData)) 
        return response.data
    } catch (e:any) {
        console.log("error",e)
    }
}

export const UploadProfilePicture=async (FormData:any)=>{
    try {
        const response=await axios.put("/api/upload/profile-picture",FormData)
        return response.data
    } catch (e:any) {
        console.log(e)
    }
}