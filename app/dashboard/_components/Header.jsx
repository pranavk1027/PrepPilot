'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

function Header({displayUserButton,displaytheme}) {
    const path=usePathname();
    console.log(path);
    
  return (
    <div className='flex h-16 px-4 items-center justify-between bg-secondary shadow-sm dark:bg-gray-800' >
      <Link href="/dashboard" className="flex items-center">
        <div className="relative w-[140px] h-[50px]">
          <Image 
            priority 
            src="/logo.svg" 
            fill
            alt='AI Interview Mocker Logo'
            className="dark:invert object-contain"
            style={{ objectFit: 'contain', objectPosition: 'left' }}
          />
        </div>
      </Link>
         
      <ul className='hidden md:flex gap-24'>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer text-lg ${path=='/dashboard' && 'text-primary font-bold'}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer  text-lg ${path=='/upgrade' && 'text-primary font-bold'}`}>
          <Link href="/upgrade">Upgrade</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer  text-lg ${path=='/howitworks' && 'text-primary font-bold'}`}>
          <Link href="/howitworks">How it works</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer text-lg  ${path=='/about' && 'text-primary font-bold'}`}>
          <Link href="/about">About</Link>
        </li>
      </ul>
         
      <div className="flex items-center gap-4">
   
     
         <UserButton/>
     
     </div>
    </div>
  )
}

export default Header