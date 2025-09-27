import React, { useEffect, useState } from 'react'
import {BlogTableItem} from "../../components/admin/BlogTableItem";
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {

  const [blogs, setBlogs] = useState([]);
  const {axios} = useAppContext();

  const fetchBlogs = async () => {
  try {
    const { data } = await axios.get('/api/admin/blogs');
    console.log('Raw response:', data);
console.log('Type of data.blogs:', typeof data.blogs);
console.log('Is array:', Array.isArray(data.blogs));
    if (data.success && Array.isArray(data.blogs)) {
      setBlogs(data.blogs);
    } else {
      toast.error('Invalid blog data format');
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All blogs</h1>

      <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm  text-gray-600 text-left'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-2 py-4'>BLOGTITLE</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>DATE</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>STATUS</th>
              <th scope='col' className='px-2 py-4'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
              {blogs.map((blog, index)=>{
                return <BlogTableItem key={blog._id} blog={blog}
                fetchBlogs={fetchBlogs} index={index+1}/>
              })}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default ListBlog