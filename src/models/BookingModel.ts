import mongoose from "mongoose";


const BookingSchema= new mongoose.Schema({
    hotelid:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:String,
    aadharNo:String,
    ContactNo:Number,
    CheckInDate:Date,
    checkOutDate:Date,
    address:{
        addressline:String,
        city:String,
        state:String,
        country:String,
        pin:String

    }
},{timestamps:true})

const Booking=mongoose.models.Booking||mongoose.model("Booking",BookingSchema)
export default Booking;