## AI Powered Blog Application(QuickBlog) 🚀

A modern AI-powered blog platform built with the MERN stack. Generate, read, and manage blog posts effortlessly with AI assistance.

## 🌟 Features

User Authentication: Secure signup & login using JWT.

AI Blog Generation: Create blogs description automatically with AI.

CRUD Operations: Create, read, update, and delete posts.

Category Management: Organize and filter blogs by category.

Responsive UI: Mobile-first design with Tailwind CSS.

## 🖥️ Demo

### Live Demo: [https://quick-blog-seven-beta.vercel.app/]

## 📸 Screenshots

Home Page
<img width="1920" height="1080" alt="Screenshot 2025-09-28 031523" src="https://github.com/user-attachments/assets/08d9e21c-1dd8-4dd2-910d-a86b0985bf47" />

Login Page 
<img width="1920" height="1080" alt="Screenshot 2025-09-28 031549" src="https://github.com/user-attachments/assets/fc1f4627-0605-4782-a7a0-18e6c427b24b" />

Blog Post Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/68607860-9535-455b-bdae-94e0cb64e138" />

Dashboard Page
<img width="1920" height="1080" alt="Screenshot 2025-09-28 031535" src="https://github.com/user-attachments/assets/e12ba353-23bb-4bd3-8a46-4b0308f891fc" />


## 🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

AI Integration: Free Google Gemini for Blog Content generation

## ⚡ Installation Prerequisites

Node.js v18+

MongoDB Atlas

## 🛠️ Steps to Clone the repository:

git clone cd QuickBlog

### Setup Instructions:

### Backend bash:
cd server
npm install
npm run dev

#### Make sure to set your environment variables in .env.local for local development.
Create .env:
PORT=4000 
MONGODB_URI = 
JWT_SECRET= 
GEMINI_API_KEY=
IMAGEKIT_URL_ENDPOINT =

Start backend: npm run server

### Frontend setup:

cd client
npm install 
npm run dev
Open http://localhost:5173 in your browser.

## 📁 Folder Structure (Simplified)
client/ └── src/ ├── components/ ├── context/ ├── pages/ └── App.jsx

server/ └── routes/ └── controllers/ └── models/ └── index.js


## 🚀 Future Enhancements

Advanced AI content optimization.

Multi-user collaboration.

Scheduled publishing.

Analytics dashboard for generated content.

## 📚 Credits

This project was inspired by GreatStack's YouTube course on full-stack development. I built it from scratch, customized the architecture, and deployed it independently.

## 📝 License

This project is licensed under the MIT License so it was free to use.
