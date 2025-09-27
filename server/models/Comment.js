import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
   blog: {type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true},
   name: {type: String, required: true},
   content: {type: String, required: true},
   isApproved: {type: Boolean, default: false},
},{timestamps: true});

//Creating the Model for storing the Blog Data
const Comment = mongoose.model('comments', commentSchema);

export default Comment;