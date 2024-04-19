import mongoose from "mongoose";
const BookingSchema= new mongoose.Schema({
    hotelId:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:String,
    hotelName:String,
    email:String,
    aadharNo:String,
    ContactNo:String,
    CheckInDate:String,
    CheckOutDate:String,
    address:String,
    price:String,
    status:String
},{timestamps:true})

const Booking=mongoose.models.Booking||mongoose.model("Booking",BookingSchema)
export default Booking;