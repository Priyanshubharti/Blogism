"use client";
import { BlogItemTypes } from '@/lib/types';
import { categories } from '@/lib/utils';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton"


const getBlogById = async (id : string) =>{
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        cache : 'no-store'
    })
    const data = await res.json();
    return data.blog;
}

const updateBlog = async (id : string, postData : any) =>{
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        cache : 'no-store',
        method : "PUT",
        body : JSON.stringify({...postData})
    })
    const data = await res.json();
    return data.blog
}

const EditBlogPage = ({params} : {params : {id : string}}) => {

    const {data : session} = useSession();
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [isLoading, setIsLoading] = useState(false)
    const headingRef = useRef<HTMLHeadingElement | null >(null)

useEffect(()=>{
    setIsLoading(true)
    toast.loading("Updating Details 🕒", {id : "loading"})
  getBlogById(params.id)
  .then((data : BlogItemTypes) => {
    const contentBlocks = convertFromHTML(data.description);
    const contentState = ContentState.createFromBlockArray(contentBlocks.contentBlocks);
    const initialState = EditorState.createWithContent(contentState);
    setEditorState(initialState)
  if(headingRef && headingRef.current)
  headingRef.current.innerText = data.title;
setIsLoading(false)
toast.success("Details Loaded Successfully 🥳 ", {id : "loading"})
  })
  .catch((err)=> {console.log(err)
  toast.error("Error Loading Details 😬", {id : "loading"})
})
  .finally(()=> setIsLoading(false))
},[])



const convertEditorDataToHtml = () =>{
   return draftToHtml(convertToRaw(editorState.getCurrentContent()));
}

   const handleEditorStateChange = (e : any) =>{
           setEditorState(e)
   }






const handlePost = async ()=>{

     const postData = {
        title : headingRef.current?.innerText,
        description : convertEditorDataToHtml()
     }

try {
toast.loading("Updating post 🕒", {id : "postUpdate"});

await updateBlog(params.id, postData)
toast.success("Your data has been updated successfully 🥳", {id : "postUpdate"});
} catch (error) {
   toast.error("Something went wrong 😬", {id : "postUpdate"});
}
}

 return (
   <section className='w-full'>
      
       <div className='flex justify-between p-4 items-center '>
           <div className=' w-1/4'>
               <span className=' font-extrabold mx-3 '> Author:</span>
               <span className=' uppercase font-semibold'>
                   {session?.user?.name}
               </span>
           </div>
           <button  
           onClick={handlePost}
           className=' bg-violet-600 text-white px-6 focus:ring-violet-950 py-3 rounded-xl font-semibold shadow-xl hover:bg-violet-700' >Publish
           </button>
           </div>
           {isLoading && (
            <p>
                <Skeleton className="w-[400px] h-[80px] rounded-xl text-center justify-center items-center mx-auto" />

            </p>
           )}
           <h1
             ref={headingRef}  
            contentEditable={true}
             className='outline-none border-none font-serif mx-auto p-4 text-2xl text-center font-semibold w-full h-28 focus:border-none'>
         {/* Update Title... */}
             </h1>
        
     
      

       <Editor 
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}

       editorStyle={
        {
               minHeight : "50vh",
               height : "auto",
               border : "1px solid #000",
               padding : 10
        }
       }
    
       />

   </section>
  )
}

export default EditBlogPage