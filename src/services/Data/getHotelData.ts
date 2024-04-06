import axios from "axios"

export const GetHotelData=async (id:string)=>{
    try{
        const response=await axios.get(`http://localhost:3000/api/data/hoteldata?id=${id}`)
        return response.data.data;
    }catch(e:any){
        console.log(e)
    }
}