import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// console.log("Attempting to connect to DB...");
await connectDb();
// console.log("DB connection initiated.");


//Middlewars
//app.use(cors())
app.use(cors({
  //origin: ['http://localhost:5173' , 'https://quick-blog-seven-beta.vercel.app', 'quick-blog-git-main-anupam-singhs-projects-94cb78b6.vercel.app', 'quick-blog-b37vshl3n-anupam-singhs-projects-94cb78b6.vercel.app', 'quick-blog-server-mu-three.vercel.app', 'quick-blog-server-git-main-anupam-singhs-projects-94cb78b6.vercel.app', 'quick-blog-server-kkkze3g0l-anupam-singhs-projects-94cb78b6.vercel.app'],
  origin: ['http://localhost:5173','https://quick-blog-seven-beta.vercel.app'],
  credentials: true                // ✅ allow cookies/auth headers
}));

app.use(express.json())


//Routes  
// - Home Route
app.get('/', (req, res)=> res.send("API is working"))
// - Login Route
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)


const PORT = process.env.port || 3000;
app.listen(PORT, ()=>{
    console.log('Server is running on Port: '+ PORT)
})

export default app;