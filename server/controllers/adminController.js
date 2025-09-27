import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Admin from "../models/admin.js";

// export const adminLogin = async (req,res) =>{
//     try {
//         const{email, password} = req.body;

//         if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
//             return res.json({success: false, message: "Invalid Credentials"})
//         }

//         const token = jwt.sign({email}, process.env.JWT_SECRET)
//         res.json({success:true, token})
//     } catch (error) {
//         res.json({success:false, message: error.message})
//     }
// }

//NEW:

// Admin signup
export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ success: true, token, message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




//funtion to get all the blogs weather they are published or unpublished

export const getAllBlogsAdmin = async(req, res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        res.json({success:true, blogs})
    } catch (error) {
                res.json({success:false, message: error.message})
    }
}

//functions to see all the comments weather they are approved or not

export const getAllcomments = async(req, res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1})
        res.json({success:true, comments})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

//to display all the details on admin dashboard
export const getDashboard = async(req, res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false})

        const getDashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        // res.json({success: true, getDashboardData})
        res.json({ success: true, dashboardData: getDashboardData });
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//function to delete the comments by ID
export const deleteCommentById = async (req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message:"Comment deleted Siccessfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//function to approve the comment
export const approveCommentById = async (req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message:"Comment approved Siccessfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}