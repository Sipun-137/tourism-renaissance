import mongoose from "mongoose";


const UserSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    imgurl:{
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/heritage-site-flask.appspot.com/o/profile%2Fprofile-icon-design-free-vector.jpg?alt=media&token=12338a86-9d1c-48b3-84fc-e7bcffca5e8d"
    }
})

const User=mongoose.models.User||mongoose.model("User",UserSchema)
export default User;