import { getBlogById } from '@/lib/helpers'
import { BlogItemTypes } from '@/lib/types';
import Image from 'next/image';
import React from 'react'

    const BlogViewPage = async ({params} : {params : {id : string}}) =>{
         const blog : BlogItemTypes = await getBlogById(params.id);
    
  return (
   <section className='w-full h-full flex flex-col'>
    <Image 
    src={blog.imageUrl ?? ""}
    alt={blog.title}
    width={1000}
    height={1000}
    className='md:w-2/4 xs:w-3/4 mx-auto my-8 drop-shadow-xl rounded-lg object-cover'
    
    />
   <div className='md:w-2/4 xs:w-3/4 mx-auto my-8 '>
    <h2 className='text-5xl text-center'>{blog.title}</h2>
   </div>
      

    <section className='md:w-2/4 xs:w-3/4 mx-auto my-8 drop-shadow-xl rounded-lg'
    dangerouslySetInnerHTML={{__html : blog.description}}
    >

    </section>
   </section>
  )
}

export default BlogViewPage;