"use client"
import { BlogItemTypes } from '@/lib/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaSearch } from 'react-icons/fa'
import BlogItem from '../components/BlogItem'

const Search = () => {
    const {handleSubmit, register} = useForm();
    const [blogs, setBlogs] = useState<BlogItemTypes[]>([])
    const handleSearch =  async ({search} : {search : string})=>{
      let str = search;
      if(search.includes(" ")){
        str = search.split(" ").join("%20");
      }
      toast.loading("Seaching...⏳", {id : "SEARCH"})
      try {
        const res = await fetch(
            `http://localhost:3000/api/blogs/search?title=${str}`,
            {cache : "no-store" }
        )
        const data = await res.json();
         setBlogs(data.blogs);
         toast.success("Searched Successful ✅", {id : "SEARCH"})
      } catch (error) {
        toast.error("Fetching Failed ⚠", {id : "SEARCH"})
        console.log(error)
      }
    }
  return (
    <section className='w-full h-full'>
        <h2 className='text-3xl text-center font-bold font-serif'>
           Pick whatever you like 😌
        </h2>
        <div className=' md:w-2/4 xs:w-3/4 w-full mx-auto flex items-center justify-between bg-slate-100 my-4 px-6 py-4 rounded-xl text-gray-900 font-semibold' >
          <input type="text" className=' bg-transparent border-none outline-none p-1 w-full' {...register("search",{required : true})} />
        <FaSearch size={40}
         className="hover:bg-slate-300 p-2 rounded-full cursor-pointer"
          // @ts-ignore
          onClick = {handleSubmit(handleSearch)}/>
        </div>
<div className='flex flex-wrap'>
{blogs?.map((blog) => (
    <BlogItem {...blog} key={blog.id} />
))}
</div>

    </section>
  )
}

export default Search