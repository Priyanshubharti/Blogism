"use client";
import React from 'react'
import Logo from './Logo';
import {FaInstagram, FaLinkedinIn, FaGithub, FaTwitter} from "react-icons/fa"
import { IconType } from 'react-icons';
const links = [FaInstagram, FaLinkedinIn, FaGithub, FaTwitter]
const IconCntainer = (props:{icon : IconType}) =>{
return <props.icon size={25} className='cursor-pointer' />
}
const Footbar = () => {
  return (
   <section className='bg-gray-100 w-full h-full'>
    <hr className='p-3' />
    <div className='flex flex-col p-20 xs:flex-col md:justify-between xs:justify-start items-center'>
      <div>
        <Logo/>
      </div>
      <div className='flex p-2 gap-6'>
           {links.map((item)=>(
            <IconCntainer icon={item} key={item.toString()} />
           ))}
      </div>

      <div>
        <p className='md:text-x1 xs:text-md font-semibold md:text-start xs:text-center'>
          <span>
            {new Date().getFullYear()} </span>
          <span>
          ⓒCopyright </span>
           <span className='font-bold'>Blogism</span>
        </p>
      </div>

    </div>

   </section>
  )
}

export default Footbar