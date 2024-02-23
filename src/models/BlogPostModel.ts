import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, title: {
        type: String,
        required: true
    }, content: {
        type: String,
        required: true
    }
},{timestamps:true})

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)
export default BlogPost;