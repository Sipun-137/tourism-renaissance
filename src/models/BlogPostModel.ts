import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    pid: String
    , title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)
export default BlogPost;