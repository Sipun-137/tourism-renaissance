import axios from "axios";

export const getPlaceData=async(formData:any)=>{
    try {
        const response = await axios.post('/api/place-data', JSON.stringify(formData))
        return response.data; 
    } catch (error) {
        console.log(error)
    }
}