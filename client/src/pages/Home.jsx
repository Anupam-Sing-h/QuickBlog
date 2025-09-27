import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newslatter from '../components/Newslatter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Header/>
        <BlogList/>
        <Newslatter/>
        <Footer/>
    </>
  )
}

export default Home