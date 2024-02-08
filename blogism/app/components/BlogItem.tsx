"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogItemTypes } from '@/lib/types';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { MdLocationPin } from "react-icons/md";

type Props = BlogItemTypes | null;

function getTextFromHtml(html: string) {
    if (document) {
      const elm = document?.createElement("span");
      elm.innerHTML = html;
      return elm.innerText.slice(0, 300);
    }
    return html;
  }

const deleteBlog = async (id : string) =>{
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        cache : 'no-store',
        method : "DELETE",
    })
}

const BlogItem = (props : Props) => {
    const handleDelete = async () =>{
        try {
            toast.loading("Deleting Blog 😒", {id : "delete"})
           props &&( await deleteBlog(props.id) )
            toast.success("Deleted Blog 👍", {id : "delete"})
        } catch (error) {
            toast.error("Error Deleting Blog 😵", {id : "delete"})
            console.log(error);
        }

    }
  return (
    props && (
   <Card className='hover:border-slate-950 duration-500 flex flex-col w-[400px] h-[550px] mx-4 my-2 rounded-lg'>
    <CardHeader>
        <Image width={400} height={100} className='h-48 rounded-sm object-cover' alt={props.title} src={props.imageUrl ?? "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg"} />
    </CardHeader>
    <CardTitle className='p-3'>
        {props.title}
    </CardTitle>
    <CardContent className='w-full text-slate-900'>
    <div className="flex justify-end gap-2 p-2 items-center font-semibold ">
            <MdLocationPin size={20} className="text-purple-600" />
            <p className="font-mono">{props.location}</p>
          </div>
     <p className='w-full px-2 py-1 tracking-wide text-left'>
        {getTextFromHtml(props.description)}
      </p>
    </CardContent>
    <CardFooter className='w-full h-full p-3 flex justify-between items-center'>
        <Link href={`/blogs/view/${props.id}`}
         className=' mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 duration-500 font-semibold' >
            View More
            </Link>
    {props.isProfile && 
       <Link href={`/blogs/edit/${props.id}`} 
       className=' mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 duration-500 font-semibold' >
        Edit Blog
        </Link>}
        {props.isProfile &&  (  <button onClick={handleDelete}
        className=' mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 duration-500 font-semibold' >
            Delete Blog
            </button>
            
        )}

    </CardFooter>
   </Card>
  )
  )
}

export default BlogItem