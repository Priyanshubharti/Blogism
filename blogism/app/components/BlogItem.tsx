"use client";
type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    location: string;
    isProfile? : boolean
}
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function getTextFromHtml(html : string) {
    const elm = window.document.createElement("span");
    elm.innerHTML = html;
    return elm.innerText.slice(0, 300);
}

const BlogItem = (props : Props) => {
  return (
   <Card className='hover:border-slate-950 duration-500 flex flex-col w-[400px] h-[550px] mx-4 my-2 rounded-lg'>
    <CardHeader>
        <Image width={400} height={100} className='h-48 rounded-sm' alt={props.title} src={props.imageUrl ?? "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg"} />
    </CardHeader>
    <CardTitle className='p-3'>
        {props.title}
    </CardTitle>
    <CardContent className='w-full text-slate-900'>
     <p className='w-full px-2 py-1 tracking-wide text-left'>
        {getTextFromHtml(props.description)}
      </p>
    </CardContent>
    <CardFooter className='w-full h-full p-3'>
        <Link href={`/blogs/view/${props.id}`} className='mr-auto mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 duration-500 font-semibold' >View More</Link>
    {props.isProfile &&    <Link href={`/blogs/edit/${props.id}`} className='ml-auto mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 duration-500 font-semibold' >Edit Blog</Link>}
    </CardFooter>
   </Card>
  )
}

export default BlogItem