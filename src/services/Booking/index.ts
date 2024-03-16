import axios from "axios";


export const CreateBooking=async(formData:any)=>{
    try {
        const response=await axios.post("/api/booking/create-booking",formData);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const CancelBooking=async(formData:any)=>{
    try {
        const response=await axios.put("",formData);
        return response.data
    } catch (e) {
        console.log(e)
    }
}


