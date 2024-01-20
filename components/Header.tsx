import React from 'react'
import SearchInput from './SearchInput'
import Link from 'next/link'

function Header() {
  return (
    <header className='bg-green-400'>
      <div className='mx-20 z-10 flex flex-col items-center md:flex-row md:justify-between lg:py-2'>
        <h1 className='text-2xl text-center mx-auto md:mx-0 my-2 text-black'>
          <Link href="/" className='font-semibold'>Pakistan<br /> Election Seats</Link>
        </h1>
        <div className='space-x-16 text-xl my-3'>
          <Link href="/" className='hover:underline'>Home</Link>
          <Link href="/districts" className='hover:underline'>Districts</Link>
          <Link href="/seats" className='hover:underline'>Seats</Link>
        </div>
        <div className='w-[146px]'></div>
      </div>
    </header>
  )
}

export default Header