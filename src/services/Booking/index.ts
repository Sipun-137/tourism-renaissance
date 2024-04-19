import axios from "axios";
import Cookies from "js-cookie"

export const CreateBooking = async (formData: any) => {
    try {
        const response = await axios.post("/api/booking/book-new", formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const CancelBooking = async (data: {id:string}) => {
    try {
        const response = await axios.put(`/api/booking/cancel`,data, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const AllBooking = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/booking/get-booking-detail?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data
    } catch (e) {
        console.log(e);
    }
}

