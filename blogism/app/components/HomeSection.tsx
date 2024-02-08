import { getAllBlogs } from '@/lib/helpers'
import Image from 'next/image'
import React from 'react'
import BlogItem from './BlogItem'
import { blogs } from '@/lib/utils'
import { BlogItemTypes } from '@/lib/types'

const HomeSection = async () => {
   
   
    
   
     const blogs = await getAllBlogs(6);
  return (
    <section className='w-full my-4'>
        <div className='w-full flex xs:flex-col md:flex-row justify-center items-center' >
            <div className='p-8 w-3/4 flex flex-col gap-3' >
                <p className='tracking-wide lg:text-6xl md:text-3xl xs:text-2xl font-semibold md:w-2/4 xs: 4/4 text-start text-gray-700'>
                    Read something new.
                </p>
                <p className="tracking-wider my-2 md:text-2xl xs:text-md font-semibold md:w-3/4 xs:w-full text-start text-gray-900" >
                    Create blog for sharing your experience and learning from others.
                </p>
            </div>
            <div className='md:w-2/4 xs:w-3/4 md:mx-2 xs:my-2 ' >
                  <Image className='w-full rounded-2xl drop-shadow-2xl object-cover' alt='CarouselImage' width={300} height={200} 
                  src={"https://images.unsplash.com/photo-1546074177-ffdda98d214f"}
                  />
            </div>
        </div>
        <hr className='p-3  my-4 w-full' />
        <div className=' flex flex-col justify-center items-center'>
            <div className='p-4'>
                <h2 className='text-2xl font-semibold'> Recent Articles</h2>

            </div>
            <div className='flex w-full flex-wrap justify-center'>
                {blogs.slice().map((blog : BlogItemTypes) => (
                    <BlogItem {...blog} key={blog.id}/>
                ) )}
            </div>
            <div className='w-full p-4 text-center'>
            <button className='mx-auto mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 duration-500 font-semibold' >Explore More Articles</button>
            </div>
            <hr className='p-3  my-4 w-full' />
        </div>

    </section>
  )
}

export default HomeSection