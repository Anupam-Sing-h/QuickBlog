import imagekit from "../configs/imageKit.js";
import fs from 'fs';
import Blog from '../models/Blog.js';
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

//function to add the new Blog
export const addBlog = async (req, res) => {

// Just for testing Purpose 
//   console.log("✅ Request received");
//   console.log("📦 Body:", req.body);
//   console.log("🖼️ File:", req.file);


  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blog"
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '1280' }
      ]
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished
    });

    res.json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//Now will create number of functions for individual purposes

//funtion to Find all the published blogs

// export const getAllBlogs = async (req, res)=>{
//     try {
//       const blogs = await Blog.find({isPublished: true})
//       res.json({success:true, blogs})
//     } catch (error) {
//       res.json({success: false, message: error.message})
//     }
// }

//funtion to Find all the Un-published blogs

// export const getAllUnpublishedBlogs = async (req, res)=>{
//     try {
//       const blogs = await Blog.find({isPublished: false})
//       res.json({success:true, blogs})
//     } catch (error) {
//       res.json({success: false, message: error.message})
//     }
// }

//function to Get individual blog by ID

export const getBlogById = async (req, res)=>{
    try {
      //const {blogId} = req.parse;
      const {blogId} = req.params;
      const blog = await Blog.findById(blogId)
      if(!blog){
        return res.json({success: false, message:"Blog not found!"});
      }
      res.json({success:true, blog})
    } catch (error) {
      res.json({success: false, message: error.message})
    }
}

//function to delete the blog by the ID

export const deleteBlogById = async (req, res)=>{
    try {
      const {id} = req.body;
      await Blog.findByIdAndDelete(id)

      //Delete all the comments associated with the blog
      await Comment.deleteMany({blog: id});
      
      res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
      res.json({success: false, message: error.message})
    }
}

//function to change the isPublished status of the blog

export const togglePublish = async (req, res)=>{
    try {
      const {id} = req.body;
      const blog = await Blog.findById(id);
      blog.isPublished = !blog.isPublished;
      await blog.save();

      res.json({success: true, message: "Blog Status Updated"})
    } catch (error) {
      res.json({success: false, message: error.message})
    }
}

//function to add comments in the blogs

export const addComment = async (req, res)=>{
    try {
      const {blog, name, content} = req.body;
      await Comment.create({blog, name, content});
      res.json({success: true, message: "Comment added for Review"})
    } catch (error) {
      res.json({success: false, message: error.message})
    }
} 

//function to display Comment data on individual Blog.
export const getBlogComments = async(req, res)=>{
  try {
    const { blogId } = req.query;
      const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
      res.json({success: true, comments})
  } catch (error) {
      res.json({success: false, message: error.message})

  }
}

//funtin to generate the blog using Gemini-2.5
export const generateContent = async (req, res)=>{
  try {
    const {prompt} = req.body;
    const content = await main(prompt + 'Generate a blog content in technical and scientific terms for this topic in simple text format')
    res.json({success: true, content})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}
// export const generateContent = async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         if (!prompt) {
//             return res.status(400).json({ success: false, message: 'Prompt is required' });
//         }
//         const topic = prompt;
//         const content = await main(
//             `Write a detailed blog post on the topic: "${topic}". 
//             - Use simple, easy-to-understand language. 
//             - Include an engaging introduction, main content divided into sections, and a concise conclusion. 
//             - Do not include any HTML or special formatting—plain text only. 
//             - Make it informative, professional, and reader-friendly.`
//         );
//         return res.status(200).json({ success: true, content });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };