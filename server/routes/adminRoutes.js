import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllcomments, getDashboard, adminSignup } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/signup', adminSignup);
adminRouter.post('/login', adminLogin);
adminRouter.get('/comments', auth, getAllcomments);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.post('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approveCommentById);
adminRouter.get('/dashboard', auth, getDashboard);


export default adminRouter;