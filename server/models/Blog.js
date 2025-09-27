import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {type: String, required: true},
    subTitle : {type: String},
    description : {type: String, required: true},
    category : {type: String, required: true},
    image : {type: String, required: true},
    isPublished : {type: Boolean, required: true},
},{timestamps: true});

//Creating the Model for storing the Blog Data
const Blog = mongoose.model('blog', blogSchema);

export default Blog;